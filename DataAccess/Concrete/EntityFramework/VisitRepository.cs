
using System;
using System.Linq;
using Core.DataAccess.EntityFramework;
using Entities.Concrete;
using DataAccess.Concrete.EntityFramework.Contexts;
using DataAccess.Abstract;
namespace DataAccess.Concrete.EntityFramework
{
    public class VisitRepository : EfEntityRepositoryBase<Visit, ProjectDbContext>, IVisitRepository
    {
        public VisitRepository(ProjectDbContext context) : base(context)
        {
        }
    }
}
