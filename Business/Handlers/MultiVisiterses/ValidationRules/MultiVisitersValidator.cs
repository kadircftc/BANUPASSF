
using Business.Handlers.MultiVisiterses.Commands;
using FluentValidation;

namespace Business.Handlers.MultiVisiterses.ValidationRules
{

    public class CreateMultiVisitersValidator : AbstractValidator<CreateMultiVisitersCommand>
    {
        public CreateMultiVisitersValidator()
        {
            RuleFor(x => x.VisitorFullName).NotEmpty();

        }
    }
    public class UpdateMultiVisitersValidator : AbstractValidator<UpdateMultiVisitersCommand>
    {
        public UpdateMultiVisitersValidator()
        {
            RuleFor(x => x.VisitorFullName).NotEmpty();

        }
    }
}