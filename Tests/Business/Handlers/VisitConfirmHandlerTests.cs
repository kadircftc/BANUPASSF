
using Business.Handlers.VisitConfirms.Queries;
using DataAccess.Abstract;
using Moq;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;
using static Business.Handlers.VisitConfirms.Queries.GetVisitConfirmQuery;
using Entities.Concrete;
using static Business.Handlers.VisitConfirms.Queries.GetVisitConfirmsQuery;
using static Business.Handlers.VisitConfirms.Commands.CreateVisitConfirmCommand;
using Business.Handlers.VisitConfirms.Commands;
using Business.Constants;
using static Business.Handlers.VisitConfirms.Commands.UpdateVisitConfirmCommand;
using static Business.Handlers.VisitConfirms.Commands.DeleteVisitConfirmCommand;
using MediatR;
using System.Linq;
using FluentAssertions;


namespace Tests.Business.HandlersTest
{
    [TestFixture]
    public class VisitConfirmHandlerTests
    {
        Mock<IVisitConfirmRepository> _visitConfirmRepository;
        Mock<IMediator> _mediator;
        [SetUp]
        public void Setup()
        {
            _visitConfirmRepository = new Mock<IVisitConfirmRepository>();
            _mediator = new Mock<IMediator>();
        }

        [Test]
        public async Task VisitConfirm_GetQuery_Success()
        {
            //Arrange
            var query = new GetVisitConfirmQuery();

            _visitConfirmRepository.Setup(x => x.GetAsync(It.IsAny<Expression<Func<VisitConfirm, bool>>>())).ReturnsAsync(new VisitConfirm()
//propertyler buraya yazılacak
//{																		
//VisitConfirmId = 1,
//VisitConfirmName = "Test"
//}
);

            var handler = new GetVisitConfirmQueryHandler(_visitConfirmRepository.Object, _mediator.Object);

            //Act
            var x = await handler.Handle(query, new System.Threading.CancellationToken());

            //Asset
            x.Success.Should().BeTrue();
            //x.Data.VisitConfirmId.Should().Be(1);

        }

        [Test]
        public async Task VisitConfirm_GetQueries_Success()
        {
            //Arrange
            var query = new GetVisitConfirmsQuery();

            _visitConfirmRepository.Setup(x => x.GetListAsync(It.IsAny<Expression<Func<VisitConfirm, bool>>>()))
                        .ReturnsAsync(new List<VisitConfirm> { new VisitConfirm() { /*TODO:propertyler buraya yazılacak VisitConfirmId = 1, VisitConfirmName = "test"*/ } });

            var handler = new GetVisitConfirmsQueryHandler(_visitConfirmRepository.Object, _mediator.Object);

            //Act
            var x = await handler.Handle(query, new System.Threading.CancellationToken());

            //Asset
            x.Success.Should().BeTrue();
            ((List<VisitConfirm>)x.Data).Count.Should().BeGreaterThan(1);

        }

        [Test]
        public async Task VisitConfirm_CreateCommand_Success()
        {
            VisitConfirm rt = null;
            //Arrange
            var command = new CreateVisitConfirmCommand();
            //propertyler buraya yazılacak
            //command.VisitConfirmName = "deneme";

            _visitConfirmRepository.Setup(x => x.GetAsync(It.IsAny<Expression<Func<VisitConfirm, bool>>>()))
                        .ReturnsAsync(rt);

            _visitConfirmRepository.Setup(x => x.Add(It.IsAny<VisitConfirm>())).Returns(new VisitConfirm());

            var handler = new CreateVisitConfirmCommandHandler(_visitConfirmRepository.Object, _mediator.Object);
            var x = await handler.Handle(command, new System.Threading.CancellationToken());

            _visitConfirmRepository.Verify(x => x.SaveChangesAsync());
            x.Success.Should().BeTrue();
            x.Message.Should().Be(Messages.Added);
        }

        [Test]
        public async Task VisitConfirm_CreateCommand_NameAlreadyExist()
        {
            //Arrange
            var command = new CreateVisitConfirmCommand();
            //propertyler buraya yazılacak 
            //command.VisitConfirmName = "test";

            _visitConfirmRepository.Setup(x => x.Query())
                                           .Returns(new List<VisitConfirm> { new VisitConfirm() { /*TODO:propertyler buraya yazılacak VisitConfirmId = 1, VisitConfirmName = "test"*/ } }.AsQueryable());

            _visitConfirmRepository.Setup(x => x.Add(It.IsAny<VisitConfirm>())).Returns(new VisitConfirm());

            var handler = new CreateVisitConfirmCommandHandler(_visitConfirmRepository.Object, _mediator.Object);
            var x = await handler.Handle(command, new System.Threading.CancellationToken());

            x.Success.Should().BeFalse();
            x.Message.Should().Be(Messages.NameAlreadyExist);
        }

        [Test]
        public async Task VisitConfirm_UpdateCommand_Success()
        {
            //Arrange
            var command = new UpdateVisitConfirmCommand();
            //command.VisitConfirmName = "test";

            _visitConfirmRepository.Setup(x => x.GetAsync(It.IsAny<Expression<Func<VisitConfirm, bool>>>()))
                        .ReturnsAsync(new VisitConfirm() { /*TODO:propertyler buraya yazılacak VisitConfirmId = 1, VisitConfirmName = "deneme"*/ });

            _visitConfirmRepository.Setup(x => x.Update(It.IsAny<VisitConfirm>())).Returns(new VisitConfirm());

            var handler = new UpdateVisitConfirmCommandHandler(_visitConfirmRepository.Object, _mediator.Object);
            var x = await handler.Handle(command, new System.Threading.CancellationToken());

            _visitConfirmRepository.Verify(x => x.SaveChangesAsync());
            x.Success.Should().BeTrue();
            x.Message.Should().Be(Messages.Updated);
        }

        [Test]
        public async Task VisitConfirm_DeleteCommand_Success()
        {
            //Arrange
            var command = new DeleteVisitConfirmCommand();

            _visitConfirmRepository.Setup(x => x.GetAsync(It.IsAny<Expression<Func<VisitConfirm, bool>>>()))
                        .ReturnsAsync(new VisitConfirm() { /*TODO:propertyler buraya yazılacak VisitConfirmId = 1, VisitConfirmName = "deneme"*/});

            _visitConfirmRepository.Setup(x => x.Delete(It.IsAny<VisitConfirm>()));

            var handler = new DeleteVisitConfirmCommandHandler(_visitConfirmRepository.Object, _mediator.Object);
            var x = await handler.Handle(command, new System.Threading.CancellationToken());

            _visitConfirmRepository.Verify(x => x.SaveChangesAsync());
            x.Success.Should().BeTrue();
            x.Message.Should().Be(Messages.Deleted);
        }
    }
}

