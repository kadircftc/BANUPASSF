
using Business.Handlers.MultiVisiterses.Queries;
using DataAccess.Abstract;
using Moq;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;
using static Business.Handlers.MultiVisiterses.Queries.GetMultiVisitersQuery;
using Entities.Concrete;
using static Business.Handlers.MultiVisiterses.Queries.GetMultiVisitersesQuery;
using static Business.Handlers.MultiVisiterses.Commands.CreateMultiVisitersCommand;
using Business.Handlers.MultiVisiterses.Commands;
using Business.Constants;
using static Business.Handlers.MultiVisiterses.Commands.UpdateMultiVisitersCommand;
using static Business.Handlers.MultiVisiterses.Commands.DeleteMultiVisitersCommand;
using MediatR;
using System.Linq;
using FluentAssertions;


namespace Tests.Business.HandlersTest
{
    [TestFixture]
    public class MultiVisitersHandlerTests
    {
        Mock<IMultiVisitersRepository> _multiVisitersRepository;
        Mock<IMediator> _mediator;
        [SetUp]
        public void Setup()
        {
            _multiVisitersRepository = new Mock<IMultiVisitersRepository>();
            _mediator = new Mock<IMediator>();
        }

        [Test]
        public async Task MultiVisiters_GetQuery_Success()
        {
            //Arrange
            var query = new GetMultiVisitersQuery();

            _multiVisitersRepository.Setup(x => x.GetAsync(It.IsAny<Expression<Func<MultiVisiters, bool>>>())).ReturnsAsync(new MultiVisiters()
//propertyler buraya yazılacak
//{																		
//MultiVisitersId = 1,
//MultiVisitersName = "Test"
//}
);

            var handler = new GetMultiVisitersQueryHandler(_multiVisitersRepository.Object, _mediator.Object);

            //Act
            var x = await handler.Handle(query, new System.Threading.CancellationToken());

            //Asset
            x.Success.Should().BeTrue();
            //x.Data.MultiVisitersId.Should().Be(1);

        }

        [Test]
        public async Task MultiVisiters_GetQueries_Success()
        {
            //Arrange
            var query = new GetMultiVisitersesQuery();

            _multiVisitersRepository.Setup(x => x.GetListAsync(It.IsAny<Expression<Func<MultiVisiters, bool>>>()))
                        .ReturnsAsync(new List<MultiVisiters> { new MultiVisiters() { /*TODO:propertyler buraya yazılacak MultiVisitersId = 1, MultiVisitersName = "test"*/ } });

            var handler = new GetMultiVisitersesQueryHandler(_multiVisitersRepository.Object, _mediator.Object);

            //Act
            var x = await handler.Handle(query, new System.Threading.CancellationToken());

            //Asset
            x.Success.Should().BeTrue();
            ((List<MultiVisiters>)x.Data).Count.Should().BeGreaterThan(1);

        }

        [Test]
        public async Task MultiVisiters_CreateCommand_Success()
        {
            MultiVisiters rt = null;
            //Arrange
            var command = new CreateMultiVisitersCommand();
            //propertyler buraya yazılacak
            //command.MultiVisitersName = "deneme";

            _multiVisitersRepository.Setup(x => x.GetAsync(It.IsAny<Expression<Func<MultiVisiters, bool>>>()))
                        .ReturnsAsync(rt);

            _multiVisitersRepository.Setup(x => x.Add(It.IsAny<MultiVisiters>())).Returns(new MultiVisiters());

            var handler = new CreateMultiVisitersCommandHandler(_multiVisitersRepository.Object, _mediator.Object);
            var x = await handler.Handle(command, new System.Threading.CancellationToken());

            _multiVisitersRepository.Verify(x => x.SaveChangesAsync());
            x.Success.Should().BeTrue();
            x.Message.Should().Be(Messages.Added);
        }

        [Test]
        public async Task MultiVisiters_CreateCommand_NameAlreadyExist()
        {
            //Arrange
            var command = new CreateMultiVisitersCommand();
            //propertyler buraya yazılacak 
            //command.MultiVisitersName = "test";

            _multiVisitersRepository.Setup(x => x.Query())
                                           .Returns(new List<MultiVisiters> { new MultiVisiters() { /*TODO:propertyler buraya yazılacak MultiVisitersId = 1, MultiVisitersName = "test"*/ } }.AsQueryable());

            _multiVisitersRepository.Setup(x => x.Add(It.IsAny<MultiVisiters>())).Returns(new MultiVisiters());

            var handler = new CreateMultiVisitersCommandHandler(_multiVisitersRepository.Object, _mediator.Object);
            var x = await handler.Handle(command, new System.Threading.CancellationToken());

            x.Success.Should().BeFalse();
            x.Message.Should().Be(Messages.NameAlreadyExist);
        }

        [Test]
        public async Task MultiVisiters_UpdateCommand_Success()
        {
            //Arrange
            var command = new UpdateMultiVisitersCommand();
            //command.MultiVisitersName = "test";

            _multiVisitersRepository.Setup(x => x.GetAsync(It.IsAny<Expression<Func<MultiVisiters, bool>>>()))
                        .ReturnsAsync(new MultiVisiters() { /*TODO:propertyler buraya yazılacak MultiVisitersId = 1, MultiVisitersName = "deneme"*/ });

            _multiVisitersRepository.Setup(x => x.Update(It.IsAny<MultiVisiters>())).Returns(new MultiVisiters());

            var handler = new UpdateMultiVisitersCommandHandler(_multiVisitersRepository.Object, _mediator.Object);
            var x = await handler.Handle(command, new System.Threading.CancellationToken());

            _multiVisitersRepository.Verify(x => x.SaveChangesAsync());
            x.Success.Should().BeTrue();
            x.Message.Should().Be(Messages.Updated);
        }

        [Test]
        public async Task MultiVisiters_DeleteCommand_Success()
        {
            //Arrange
            var command = new DeleteMultiVisitersCommand();

            _multiVisitersRepository.Setup(x => x.GetAsync(It.IsAny<Expression<Func<MultiVisiters, bool>>>()))
                        .ReturnsAsync(new MultiVisiters() { /*TODO:propertyler buraya yazılacak MultiVisitersId = 1, MultiVisitersName = "deneme"*/});

            _multiVisitersRepository.Setup(x => x.Delete(It.IsAny<MultiVisiters>()));

            var handler = new DeleteMultiVisitersCommandHandler(_multiVisitersRepository.Object, _mediator.Object);
            var x = await handler.Handle(command, new System.Threading.CancellationToken());

            _multiVisitersRepository.Verify(x => x.SaveChangesAsync());
            x.Success.Should().BeTrue();
            x.Message.Should().Be(Messages.Deleted);
        }
    }
}

