
using Business.Handlers.VisitConfirms.Commands;
using FluentValidation;

namespace Business.Handlers.VisitConfirms.ValidationRules
{

    public class CreateVisitConfirmValidator : AbstractValidator<CreateVisitConfirmCommand>
    {
        public CreateVisitConfirmValidator()
        {
            RuleFor(x => x.SecurityId).NotEmpty();

        }
    }
    public class UpdateVisitConfirmValidator : AbstractValidator<UpdateVisitConfirmCommand>
    {
        public UpdateVisitConfirmValidator()
        {
            RuleFor(x => x.SecurityId).NotEmpty();

        }
    }
}