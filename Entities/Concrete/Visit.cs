using Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Concrete
{
    public class Visit: BaseEntity,IEntity
    {
        public int PersonnelId { get; set; }
        public string VisitorFullName { get; set; }
        public string VisitorLicensePlate { get; set; }
        public bool VehicleEntry { get; set; }
        public bool MultiPersonVisit { get; set; }
        public bool IsConfirm { get; set; }
        public bool IsExit{ get; set; }
        public bool Status{ get; set; }
        public string? ReasonForRejection { get; set; }
        public bool IsReject {  get; set; }
        public DateTime ApprovalDate { get; set; }
        public DateTime ExitDate { get; set; }
        public DateTime VisitStartDate { get; set; }
        public DateTime VisitEndDate { get; set; }
    }
}
