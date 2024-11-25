
using Business.Handlers.BanuLogs.Queries;
using DataAccess.Abstract;
using Moq;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;
using static Business.Handlers.BanuLogs.Queries.GetBanuLogQuery;
using Entities.Concrete;
using static Business.Handlers.BanuLogs.Queries.GetBanuLogsQuery;
using static Business.Handlers.BanuLogs.Commands.CreateBanuLogCommand;
using Business.Handlers.BanuLogs.Commands;
using Business.Constants;
using static Business.Handlers.BanuLogs.Commands.UpdateBanuLogCommand;
using static Business.Handlers.BanuLogs.Commands.DeleteBanuLogCommand;
using MediatR;
using System.Linq;
using FluentAssertions;


namespace Tests.Business.HandlersTest
{
    [TestFixture]
    public class BanuLogHandlerTests
    {
        Mock<IBanuLogRepository> _banuLogRepository;
        Mock<IMediator> _mediator;
        [SetUp]
        public void Setup()
        {
            _banuLogRepository = new Mock<IBanuLogRepository>();
            _mediator = new Mock<IMediator>();
        }

        [Test]
        public async Task BanuLog_GetQuery_Success()
        {
            //Arrange
            var query = new GetBanuLogQuery();

            _banuLogRepository.Setup(x => x.GetAsync(It.IsAny<Expression<Func<BanuLog, bool>>>())).ReturnsAsync(new BanuLog()
//propertyler buraya yazılacak
//{																		
//BanuLogId = 1,
//BanuLogName = "Test"
//}
);

            var handler = new GetBanuLogQueryHandler(_banuLogRepository.Object, _mediator.Object);

            //Act
            var x = await handler.Handle(query, new System.Threading.CancellationToken());

            //Asset
            x.Success.Should().BeTrue();
            //x.Data.BanuLogId.Should().Be(1);

        }

        [Test]
        public async Task BanuLog_GetQueries_Success()
        {
            //Arrange
            var query = new GetBanuLogsQuery();

            _banuLogRepository.Setup(x => x.GetListAsync(It.IsAny<Expression<Func<BanuLog, bool>>>()))
                        .ReturnsAsync(new List<BanuLog> { new BanuLog() { /*TODO:propertyler buraya yazılacak BanuLogId = 1, BanuLogName = "test"*/ } });

            var handler = new GetBanuLogsQueryHandler(_banuLogRepository.Object, _mediator.Object);

            //Act
            var x = await handler.Handle(query, new System.Threading.CancellationToken());

            //Asset
            x.Success.Should().BeTrue();
            ((List<BanuLog>)x.Data).Count.Should().BeGreaterThan(1);

        }

        [Test]
        public async Task BanuLog_CreateCommand_Success()
        {
            BanuLog rt = null;
            //Arrange
            var command = new CreateBanuLogCommand();
            //propertyler buraya yazılacak
            //command.BanuLogName = "deneme";

            _banuLogRepository.Setup(x => x.GetAsync(It.IsAny<Expression<Func<BanuLog, bool>>>()))
                        .ReturnsAsync(rt);

            _banuLogRepository.Setup(x => x.Add(It.IsAny<BanuLog>())).Returns(new BanuLog());

            var handler = new CreateBanuLogCommandHandler(_banuLogRepository.Object, _mediator.Object);
            var x = await handler.Handle(command, new System.Threading.CancellationToken());

            _banuLogRepository.Verify(x => x.SaveChangesAsync());
            x.Success.Should().BeTrue();
            x.Message.Should().Be(Messages.Added);
        }

        [Test]
        public async Task BanuLog_CreateCommand_NameAlreadyExist()
        {
            //Arrange
            var command = new CreateBanuLogCommand();
            //propertyler buraya yazılacak 
            //command.BanuLogName = "test";

            _banuLogRepository.Setup(x => x.Query())
                                           .Returns(new List<BanuLog> { new BanuLog() { /*TODO:propertyler buraya yazılacak BanuLogId = 1, BanuLogName = "test"*/ } }.AsQueryable());

            _banuLogRepository.Setup(x => x.Add(It.IsAny<BanuLog>())).Returns(new BanuLog());

            var handler = new CreateBanuLogCommandHandler(_banuLogRepository.Object, _mediator.Object);
            var x = await handler.Handle(command, new System.Threading.CancellationToken());

            x.Success.Should().BeFalse();
            x.Message.Should().Be(Messages.NameAlreadyExist);
        }

        [Test]
        public async Task BanuLog_UpdateCommand_Success()
        {
            //Arrange
            var command = new UpdateBanuLogCommand();
            //command.BanuLogName = "test";

            _banuLogRepository.Setup(x => x.GetAsync(It.IsAny<Expression<Func<BanuLog, bool>>>()))
                        .ReturnsAsync(new BanuLog() { /*TODO:propertyler buraya yazılacak BanuLogId = 1, BanuLogName = "deneme"*/ });

            _banuLogRepository.Setup(x => x.Update(It.IsAny<BanuLog>())).Returns(new BanuLog());

            var handler = new UpdateBanuLogCommandHandler(_banuLogRepository.Object, _mediator.Object);
            var x = await handler.Handle(command, new System.Threading.CancellationToken());

            _banuLogRepository.Verify(x => x.SaveChangesAsync());
            x.Success.Should().BeTrue();
            x.Message.Should().Be(Messages.Updated);
        }

        [Test]
        public async Task BanuLog_DeleteCommand_Success()
        {
            //Arrange
            var command = new DeleteBanuLogCommand();

            _banuLogRepository.Setup(x => x.GetAsync(It.IsAny<Expression<Func<BanuLog, bool>>>()))
                        .ReturnsAsync(new BanuLog() { /*TODO:propertyler buraya yazılacak BanuLogId = 1, BanuLogName = "deneme"*/});

            _banuLogRepository.Setup(x => x.Delete(It.IsAny<BanuLog>()));

            var handler = new DeleteBanuLogCommandHandler(_banuLogRepository.Object, _mediator.Object);
            var x = await handler.Handle(command, new System.Threading.CancellationToken());

            _banuLogRepository.Verify(x => x.SaveChangesAsync());
            x.Success.Should().BeTrue();
            x.Message.Should().Be(Messages.Deleted);
        }
    }
}

