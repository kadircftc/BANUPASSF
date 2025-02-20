using Core.Entities;
using Core.Entities.Concrete;
using Core.Enums;
using Core.Extensions;
using Core.Utilities.Results;
using Microsoft.EntityFrameworkCore;
using Nest;
using ServiceStack;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Linq.Expressions;
using System.Text.Json;
using System.Threading.Tasks;

namespace Core.DataAccess.EntityFramework
{
    /// <summary>
    ///
    /// </summary>
    /// <typeparam name="TEntity"></typeparam>
    /// <typeparam name="TContext"></typeparam>
    public class EfEntityRepositoryBase<TEntity, TContext>
        : IEntityRepository<TEntity>
        where TEntity : class, IEntity
        where TContext : DbContext
    {
        public EfEntityRepositoryBase(TContext context)
        {
            Context = context;
        }

        protected TContext Context { get; }

        public TEntity Add(TEntity entity)
        {
            return Context.Add(entity).Entity;
        }

        public TEntity Update(TEntity entity)
        {
            Context.Update(entity);
            return entity;
        }

        public void Delete(TEntity entity)
        {
            Context.Remove(entity);
        }

        public TEntity Get(Expression<Func<TEntity, bool>> expression)
        {
            return Context.Set<TEntity>().FirstOrDefault(expression);
        }

        public async Task<TEntity> GetAsync(Expression<Func<TEntity, bool>> expression)
        {
            return await Context.Set<TEntity>().AsQueryable().FirstOrDefaultAsync(expression);
        }

        public IEnumerable<TEntity> GetList(Expression<Func<TEntity, bool>> expression = null)
        {
            return expression == null
                ? Context.Set<TEntity>().AsNoTracking()
                : Context.Set<TEntity>().Where(expression).AsNoTracking();
        }

        public async Task<IEnumerable<TEntity>> GetListAsync(Expression<Func<TEntity, bool>> expression = null)
        {
            return expression == null
                ? await Context.Set<TEntity>().ToListAsync()
                : await Context.Set<TEntity>().Where(expression).ToListAsync();
        }

        //sources: https://www.nuget.org/packages/Apsiyon  |||  https://github.com/vmutlu/ApsiyonFramework
        public async Task<PrivPagingResult<TEntity>> GetListForPaging(int page,int pageSize, string propertyName, bool asc, Expression<Func<TEntity, bool>> expression = null, params Expression<Func<TEntity, object>>[] includeEntities)
        {
            var list = Context.Set<TEntity>().AsQueryable();

            if (includeEntities.Length > 0)
                list = list.IncludeMultiple(includeEntities);

            if (expression != null)
                list = list.Where(expression).AsQueryable();

            list = asc ? list.AscOrDescOrder(ESort.ASC, propertyName) : list.AscOrDescOrder(ESort.DESC, propertyName);
            int totalCount = list.Count();
            int totalPages = (int)Math.Ceiling((double)totalCount / pageSize);



            var start = (page - 1) * pageSize;
            list = list.Skip(start).Take(pageSize);

            return new PrivPagingResult<TEntity>(await list.ToListAsync(), totalCount, true, $"{totalCount} records listed.",totalPages);
        }


        public async Task<PagingResult<TEntity>> GetListForTableSearch(TableGlobalFilter globalFilter)
        {
            if (globalFilter == null)
            {
                var count = Context.Set<TEntity>().Count();
                return new PagingResult<TEntity>(await Context.Set<TEntity>().ToListAsync(), count, true,
                    $"{count} records listed.");
            }

            var parameterOfExpression = Expression.Parameter(typeof(TEntity), "x");

            var toLowerMethod = typeof(string).GetMethod("ToLower", new Type[] { });


            if (globalFilter.PropertyField.Count > 0)
            {
                var containMethod = typeof(string).GetMethod("Contains", new[] { typeof(string) });

                var searchedValue = Expression.Constant(globalFilter.SearchText.ToLower(), typeof(string));

                var globalFilterPropertyField = Expression.PropertyOrField(parameterOfExpression, globalFilter.PropertyField[0]);

                Expression finalExpression = Expression.Call(Expression.Call(globalFilterPropertyField, toLowerMethod), containMethod, searchedValue);

                for (int i = 1; i < globalFilter.PropertyField.Count; i++)
                {
                    var propertyName = globalFilter.PropertyField[i];

                    globalFilterPropertyField = Expression.PropertyOrField(parameterOfExpression, propertyName);
                    var globalFilterConstant = Expression.Call(Expression.Call(globalFilterPropertyField, toLowerMethod), containMethod, searchedValue);

                    finalExpression = Expression.Or(finalExpression, globalFilterConstant);
                }

                var list = Context.Set<TEntity>()
                    .Where(Expression.Lambda<Func<TEntity, bool>>(finalExpression, parameterOfExpression));

                list = list.AscOrDescOrder(globalFilter.SortOrder == 1 ? ESort.ASC : ESort.DESC,
                    globalFilter.SortField).Skip(globalFilter.First).Take(globalFilter.Rows);

                var totalCountForFilter = list.Count();

                return new PagingResult<TEntity>(list.ToList(), totalCountForFilter, true,
                    $"{totalCountForFilter} records listed.");
            }

            //Is no have search text
            var totalCount = await Context.Set<TEntity>().CountAsync();

            return new PagingResult<TEntity>(await Context.Set<TEntity>().Skip(globalFilter.First).Take(globalFilter.Rows).ToListAsync(), totalCount, true,
                $"{totalCount} records listed.");
        }


        public int SaveChanges()
        {
            return Context.SaveChanges();
        }

        public Task<int> SaveChangesAsync()
        {
            return Context.SaveChangesAsync();
        }

        public IQueryable<TEntity> Query()
        {
            return Context.Set<TEntity>();
        }

        public Task<int> Execute(FormattableString interpolatedQueryString)
        {
            return Context.Database.ExecuteSqlInterpolatedAsync(interpolatedQueryString);
        }

        /// <summary>
        /// Transactional operations is prohibited when working with InMemoryDb!
        /// </summary>
        /// <typeparam name="TResult"></typeparam>
        /// <param name="action"></param>
        /// <param name="successAction"></param>
        /// <param name="exceptionAction"></param>
        /// <returns></returns>
        public TResult InTransaction<TResult>(Func<TResult> action, Action successAction = null, Action<Exception> exceptionAction = null)
        {
            var result = default(TResult);
            try
            {
                if (Context.Database.ProviderName.EndsWith("InMemory"))
                {
                    result = action();
                    SaveChanges();
                }
                else
                {
                    using var tx = Context.Database.BeginTransaction();
                    try
                    {
                        result = action();
                        SaveChanges();
                        tx.Commit();
                    }
                    catch (Exception)
                    {
                        tx.Rollback();
                        throw;
                    }
                }

                successAction?.Invoke();
            }
            catch (Exception ex)
            {
                if (exceptionAction == null)
                {
                    throw;
                }

                exceptionAction(ex);
            }

            return result;
        }

        public async Task<int> GetCountAsync(Expression<Func<TEntity, bool>> expression = null)
        {
            if (expression == null)
            {
                return await Context.Set<TEntity>().CountAsync();
            }
            else
            {
                return await Context.Set<TEntity>().CountAsync(expression);
            }
        }

        public int GetCount(Expression<Func<TEntity, bool>> expression = null)
        {
            return expression == null ? Context.Set<TEntity>().Count() : Context.Set<TEntity>().Count(expression);
        }

        public async Task<IEnumerable<TEntity>> BulkInsert(int TId, IEnumerable<TEntity> TIds)
        {
                await Context.Set<TEntity>().AddRangeAsync(TIds);
                return TIds;   
        }
      



        public async Task<IEnumerable<TEntity>> GetFilteredListAsync(List<GlobalFilterGeneric> filters, Expression<Func<TEntity, bool>> expression = null)
        {
            var query = Context.Set<TEntity>().AsQueryable();

            foreach (var filter in filters)
            {
                var parameter = Expression.Parameter(typeof(TEntity), "x");
                var property = Expression.PropertyOrField(parameter, filter.Key);

                var value = filter.Value;

                if (value is JsonElement jsonValue && filter.Key.Contains("Date"))
                {
                    if (jsonValue.ValueKind == JsonValueKind.String)
                    {
                        var stringValue = jsonValue.GetString();

                        if (DateTime.TryParseExact(stringValue, "dd-MM-yyyy", CultureInfo.InvariantCulture, DateTimeStyles.None, out DateTime dateTimeValue))
                        {
                            value = dateTimeValue.Date;
                        }
                        else
                        {
                            throw new InvalidOperationException($"Invalid date format: {stringValue}. Expected format is 'dd-MM-yyyy'.");
                        }
                    }
                }

                if (value is JsonElement jsonElement)
                {
                    switch (jsonElement.ValueKind)
                    {
                        case JsonValueKind.String:
                            value = jsonElement.GetString();
                            break;
                        case JsonValueKind.Number:
                            if (property.Type == typeof(int))
                            {
                                value = jsonElement.GetInt32();
                            }
                            else if (property.Type == typeof(decimal))
                            {
                                value = jsonElement.GetDecimal();
                            }
                            else if (property.Type == typeof(double))
                            {
                                value = jsonElement.GetDouble();
                            }
                            break;
                        case JsonValueKind.True:
                        case JsonValueKind.False:
                            if (property.Type == typeof(bool))
                            {
                                value = jsonElement.GetBoolean();
                            }
                            break;
                        default:
                            break;
                    }
                }

                var valueExpression = Expression.Constant(value);

                Expression predicate;

                switch (filter.Operation)
                {
                    case "Equals":
                        if (property.Type == typeof(DateTime))
                        {
                            var dateProperty = Expression.Property(property, "Date");
                            predicate = Expression.Equal(dateProperty, valueExpression);
                        }
                        else
                        {
                            predicate = Expression.Equal(property, valueExpression);
                        }
                        break;

                    case "Contains":
                        if (property.Type == typeof(string))
                        {
                            predicate = Expression.Call(property, typeof(string).GetMethod("Contains", new[] { typeof(string) }), valueExpression);
                        }
                        else
                        {
                            throw new InvalidOperationException($"'Contains' operation is only supported for type 'string'.");
                        }
                        break;

                    case "GreaterThan":
                        predicate = Expression.GreaterThan(property, valueExpression);
                        break;

                    case "LessThan":
                        predicate = Expression.LessThan(property, valueExpression);
                        break;

                    case "GreaterThanOrEqual":
                        predicate = Expression.GreaterThanOrEqual(property, valueExpression);
                        break;

                    case "LessThanOrEqual":
                        predicate = Expression.LessThanOrEqual(property, valueExpression);
                        break;

                    default:
                        throw new InvalidOperationException($"Operation '{filter.Operation}' is not supported");
                }

                var lambda = Expression.Lambda<Func<TEntity, bool>>(predicate, parameter);

                query = query.Where(lambda);

            }

            return await query.ToListAsync();
        }
        public async Task<PrivPagingResult<TEntity>> GetFilteredAndPagedListAsync(
    List<GlobalFilterGeneric> filters,
    int page,
    int pageSize,
    string propertyName,
    bool asc,
    params Expression<Func<TEntity, object>>[] includeEntities)
        {
            var query = Context.Set<TEntity>().AsQueryable();

            if (includeEntities.Length > 0)
            {
                query = query.IncludeMultiple(includeEntities);
            }

            foreach (var filter in filters)
            {
                var parameter = Expression.Parameter(typeof(TEntity), "x");
                var property = Expression.PropertyOrField(parameter, filter.Key);

                var value = filter.Value;

                if (value is JsonElement jsonValue && filter.Key.Contains("Date"))
                {
                    if (jsonValue.ValueKind == JsonValueKind.String)
                    {
                        var stringValue = jsonValue.GetString();

                        if (DateTime.TryParseExact(stringValue, "dd-MM-yyyy", CultureInfo.InvariantCulture, DateTimeStyles.None, out DateTime dateTimeValue))
                        {
                            value = dateTimeValue.Date;
                        }
                        else
                        {
                            throw new InvalidOperationException($"Invalid date format: {stringValue}. Expected format is 'dd-MM-yyyy'.");
                        }
                    }
                }

                if (value is JsonElement jsonElement)
                {
                    switch (jsonElement.ValueKind)
                    {
                        case JsonValueKind.String:
                            value = jsonElement.GetString();
                            break;
                        case JsonValueKind.Number:
                            if (property.Type == typeof(int))
                            {
                                value = jsonElement.GetInt32();
                            }
                            else if (property.Type == typeof(decimal))
                            {
                                value = jsonElement.GetDecimal();
                            }
                            else if (property.Type == typeof(double))
                            {
                                value = jsonElement.GetDouble();
                            }
                            break;
                        case JsonValueKind.True:
                        case JsonValueKind.False:
                            if (property.Type == typeof(bool))
                            {
                                value = jsonElement.GetBoolean();
                            }
                            break;
                        default:
                            break;
                    }
                }

                var valueExpression = Expression.Constant(value);

                Expression predicate;

                switch (filter.Operation)
                {
                    case "Equals":
                        if (property.Type == typeof(DateTime))
                        {
                            var dateProperty = Expression.Property(property, "Date");
                            predicate = Expression.Equal(dateProperty, valueExpression);
                        }
                        else
                        {
                            predicate = Expression.Equal(property, valueExpression);
                        }
                        break;

                    case "Contains":
                        if (property.Type == typeof(string))
                        {
                            predicate = Expression.Call(property, typeof(string).GetMethod("Contains", new[] { typeof(string) }), valueExpression);
                        }
                        else
                        {
                            throw new InvalidOperationException("'Contains' operation is only supported for type 'string'.");
                        }
                        break;

                    case "GreaterThan":
                        predicate = Expression.GreaterThan(property, valueExpression);
                        break;

                    case "LessThan":
                        predicate = Expression.LessThan(property, valueExpression);
                        break;

                    case "GreaterThanOrEqual":
                        predicate = Expression.GreaterThanOrEqual(property, valueExpression);
                        break;

                    case "LessThanOrEqual":
                        predicate = Expression.LessThanOrEqual(property, valueExpression);
                        break;

                    default:
                        throw new InvalidOperationException($"Operation '{filter.Operation}' is not supported");
                }

                var lambda = Expression.Lambda<Func<TEntity, bool>>(predicate, parameter);

                query = query.Where(lambda);
            }

            query = asc
                ? query.AscOrDescOrder(ESort.ASC, propertyName)
                : query.AscOrDescOrder(ESort.DESC, propertyName);

            int totalCount = await query.CountAsync();
            int totalPages = (int)Math.Ceiling((double)totalCount / pageSize);

            var start = (page - 1) * pageSize;
            var pagedQuery = query.Skip(start).Take(pageSize);

            var result = await pagedQuery.ToListAsync();

            return new PrivPagingResult<TEntity>(result, totalCount, true, $"{totalCount} records listed.", totalPages);
        }

       
    }
}