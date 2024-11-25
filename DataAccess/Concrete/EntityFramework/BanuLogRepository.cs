
using System;
using System.Linq;
using Core.DataAccess.EntityFramework;
using Entities.Concrete;
using DataAccess.Concrete.EntityFramework.Contexts;
using DataAccess.Abstract;
namespace DataAccess.Concrete.EntityFramework
{
    public class BanuLogRepository : EfEntityRepositoryBase<BanuLog, ProjectDbContext>, IBanuLogRepository
    {
        public BanuLogRepository(ProjectDbContext context) : base(context)
        {
        }
    }
}
