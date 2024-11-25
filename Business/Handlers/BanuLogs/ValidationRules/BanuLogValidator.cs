
using Business.Handlers.BanuLogs.Commands;
using FluentValidation;

namespace Business.Handlers.BanuLogs.ValidationRules
{

    public class CreateBanuLogValidator : AbstractValidator<CreateBanuLogCommand>
    {
        public CreateBanuLogValidator()
        {
            RuleFor(x => x.TransactorId).NotEmpty();
            RuleFor(x => x.TransactionsDescription).NotEmpty();
            RuleFor(x => x.TransactionType).NotEmpty();

        }
    }
    public class UpdateBanuLogValidator : AbstractValidator<UpdateBanuLogCommand>
    {
        public UpdateBanuLogValidator()
        {
            RuleFor(x => x.TransactorId).NotEmpty();
            RuleFor(x => x.TransactionsDescription).NotEmpty();
            RuleFor(x => x.TransactionType).NotEmpty();

        }
    }
}