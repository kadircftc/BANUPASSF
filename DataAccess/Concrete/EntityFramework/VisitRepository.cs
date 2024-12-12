
using System;
using System.Linq;
using Core.DataAccess.EntityFramework;
using Entities.Concrete;
using DataAccess.Concrete.EntityFramework.Contexts;
using DataAccess.Abstract;
using System.Threading.Tasks;
using Entities.Dtos;
using System.Collections.Generic;
using System.Globalization;
using Microsoft.EntityFrameworkCore;
using Nest;

namespace DataAccess.Concrete.EntityFramework
{
    public class VisitRepository : EfEntityRepositoryBase<Visit, ProjectDbContext>, IVisitRepository
    {
        private readonly ProjectDbContext _context;
        public VisitRepository(ProjectDbContext context) : base(context)
        {
            _context = context;
        }




    public async Task<List<VisitMultiVisitMergeDto>> VisitMultiVisitMergeList(string date)
    {
        DateTime parsedDate;
        if (!DateTime.TryParseExact(date, "dd-MM-yyyy", CultureInfo.InvariantCulture, DateTimeStyles.None, out parsedDate))
        {
            throw new ArgumentException("Geçersiz tarih formatı");
        }

        var result = from visit in _context.Visits
                     join multiVisit in _context.MultiVisiterses
                     on visit.Id equals multiVisit.VisitId into multiVisitGroup
                     from multiVisit in multiVisitGroup.DefaultIfEmpty() 
                     where visit.VisitStartDate.Date == parsedDate.Date 
                     select new
                     {
                         Visit = visit,
                         MultiVisit = multiVisit
                     };

        var mergedResult = await result
            .GroupBy(x => x.Visit.Id) 
            .Select(g => new VisitMultiVisitMergeDto
            {
                Visit = g.First().Visit, 
                MultiVisiters = g.Where(x => x.MultiVisit != null) 
                                  .Select(x => new MultiVisiters
                                  {
                                      VisitId = x.MultiVisit.VisitId,
                                      VisitorFullName = x.MultiVisit.VisitorFullName
                                  })
                                  .DefaultIfEmpty() 
                                  .ToList()
            }).ToListAsync();

        return mergedResult;
    }


}
}
