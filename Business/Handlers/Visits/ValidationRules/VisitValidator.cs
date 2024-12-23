
using Business.Handlers.Visits.Commands;
using FluentValidation;

namespace Business.Handlers.Visits.ValidationRules
{

    public class CreateVisitValidator : AbstractValidator<CreateVisitCommand>
    {
        public CreateVisitValidator()
        {
            RuleFor(x => x.VisitorFullName).NotEmpty();
           
            RuleFor(x => x.VehicleEntry)
    .NotNull().WithMessage("Vehicle Entry cannot be null.")
    .Must(x => x == false || x == true).WithMessage("Vehicle Entry must be a valid boolean value (true or false).");

            RuleFor(x => x.MultiPersonVisit)
                .NotNull().WithMessage("Multi Person Visit cannot be null.")
                .Must(x => x == false || x == true).WithMessage("Multi Person Visit must be a valid boolean value (true or false).");

           
            RuleFor(x => x.VisitStartDate).NotEmpty();
            RuleFor(x => x.VisitEndDate).NotEmpty();

        }
    }
    public class UpdateVisitValidator : AbstractValidator<UpdateVisitCommand>
    {
        public UpdateVisitValidator()
        {
            RuleFor(x => x.VisitorFullName).NotEmpty();
            RuleFor(x => x.VisitorLicensePlate).NotEmpty();
            RuleFor(x => x.VehicleEntry).NotEmpty();
            RuleFor(x => x.MultiPersonVisit).NotEmpty();
            RuleFor(x => x.IsConfirm).NotEmpty();
            RuleFor(x => x.ApprovalDate).NotEmpty();
            RuleFor(x => x.ExitDate).NotEmpty();
            RuleFor(x => x.VisitStartDate).NotEmpty();
            RuleFor(x => x.VisitEndDate).NotEmpty();

        }
    }
    public class VisitRejectValidator : AbstractValidator<VisitRejectCommand>
    {
        public VisitRejectValidator()
        {
            //RuleFor(x => x.ReasonForRejection).NotEmpty();
            
        }
    }
}