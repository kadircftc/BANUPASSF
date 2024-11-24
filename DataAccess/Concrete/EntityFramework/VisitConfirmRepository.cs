
using System;
using System.Linq;
using Core.DataAccess.EntityFramework;
using Entities.Concrete;
using DataAccess.Concrete.EntityFramework.Contexts;
using DataAccess.Abstract;
namespace DataAccess.Concrete.EntityFramework
{
    public class VisitConfirmRepository : EfEntityRepositoryBase<VisitConfirm, ProjectDbContext>, IVisitConfirmRepository
    {
        public VisitConfirmRepository(ProjectDbContext context) : base(context)
        {
        }
    }
}
