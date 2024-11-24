
//using Business.Handlers.Visits.Queries;
//using DataAccess.Abstract;
//using Moq;
//using NUnit.Framework;
//using System;
//using System.Collections.Generic;
//using System.Linq.Expressions;
//using System.Threading.Tasks;
//using static Business.Handlers.Visits.Queries.GetVisitQuery;
//using Entities.Concrete;
//using static Business.Handlers.Visits.Queries.GetVisitsQuery;
//using static Business.Handlers.Visits.Commands.CreateVisitCommand;
//using Business.Handlers.Visits.Commands;
//using Business.Constants;
//using static Business.Handlers.Visits.Commands.UpdateVisitCommand;
//using static Business.Handlers.Visits.Commands.DeleteVisitCommand;
//using MediatR;
//using System.Linq;
//using FluentAssertions;


//namespace Tests.Business.HandlersTest
//{
//    [TestFixture]
//    public class VisitHandlerTests
//    {
//        Mock<IVisitRepository> _visitRepository;
//        Mock<IMediator> _mediator;
//        [SetUp]
//        public void Setup()
//        {
//            _visitRepository = new Mock<IVisitRepository>();
//            _mediator = new Mock<IMediator>();
//        }

//        [Test]
//        public async Task Visit_GetQuery_Success()
//        {
//            //Arrange
//            var query = new GetVisitQuery();

//            _visitRepository.Setup(x => x.GetAsync(It.IsAny<Expression<Func<Visit, bool>>>())).ReturnsAsync(new Visit()
////propertyler buraya yazılacak
////{																		
////VisitId = 1,
////VisitName = "Test"
////}
//);

//            var handler = new GetVisitQueryHandler(_visitRepository.Object, _mediator.Object);

//            //Act
//            var x = await handler.Handle(query, new System.Threading.CancellationToken());

//            //Asset
//            x.Success.Should().BeTrue();
//            //x.Data.VisitId.Should().Be(1);

//        }

//        [Test]
//        public async Task Visit_GetQueries_Success()
//        {
//            //Arrange
//            var query = new GetVisitsQuery();

//            _visitRepository.Setup(x => x.GetListAsync(It.IsAny<Expression<Func<Visit, bool>>>()))
//                        .ReturnsAsync(new List<Visit> { new Visit() { /*TODO:propertyler buraya yazılacak VisitId = 1, VisitName = "test"*/ } });

//            var handler = new GetVisitsQueryHandler(_visitRepository.Object, _mediator.Object);

//            //Act
//            var x = await handler.Handle(query, new System.Threading.CancellationToken());

//            //Asset
//            x.Success.Should().BeTrue();
//            ((List<Visit>)x.Data).Count.Should().BeGreaterThan(1);

//        }

//        [Test]
//        public async Task Visit_CreateCommand_Success()
//        {
//            Visit rt = null;
//            //Arrange
//            var command = new CreateVisitCommand();
//            //propertyler buraya yazılacak
//            //command.VisitName = "deneme";

//            _visitRepository.Setup(x => x.GetAsync(It.IsAny<Expression<Func<Visit, bool>>>()))
//                        .ReturnsAsync(rt);

//            _visitRepository.Setup(x => x.Add(It.IsAny<Visit>())).Returns(new Visit());

//            var handler = new CreateVisitCommandHandler(_visitRepository.Object, _mediator.Object);
//            var x = await handler.Handle(command, new System.Threading.CancellationToken());

//            _visitRepository.Verify(x => x.SaveChangesAsync());
//            x.Success.Should().BeTrue();
//            x.Message.Should().Be(Messages.Added);
//        }

//        [Test]
//        public async Task Visit_CreateCommand_NameAlreadyExist()
//        {
//            //Arrange
//            var command = new CreateVisitCommand();
//            //propertyler buraya yazılacak 
//            //command.VisitName = "test";

//            _visitRepository.Setup(x => x.Query())
//                                           .Returns(new List<Visit> { new Visit() { /*TODO:propertyler buraya yazılacak VisitId = 1, VisitName = "test"*/ } }.AsQueryable());

//            _visitRepository.Setup(x => x.Add(It.IsAny<Visit>())).Returns(new Visit());

//            var handler = new CreateVisitCommandHandler(_visitRepository.Object, _mediator.Object);
//            var x = await handler.Handle(command, new System.Threading.CancellationToken());

//            x.Success.Should().BeFalse();
//            x.Message.Should().Be(Messages.NameAlreadyExist);
//        }

//        [Test]
//        public async Task Visit_UpdateCommand_Success()
//        {
//            //Arrange
//            var command = new UpdateVisitCommand();
//            //command.VisitName = "test";

//            _visitRepository.Setup(x => x.GetAsync(It.IsAny<Expression<Func<Visit, bool>>>()))
//                        .ReturnsAsync(new Visit() { /*TODO:propertyler buraya yazılacak VisitId = 1, VisitName = "deneme"*/ });

//            _visitRepository.Setup(x => x.Update(It.IsAny<Visit>())).Returns(new Visit());

//            var handler = new UpdateVisitCommandHandler(_visitRepository.Object, _mediator.Object);
//            var x = await handler.Handle(command, new System.Threading.CancellationToken());

//            _visitRepository.Verify(x => x.SaveChangesAsync());
//            x.Success.Should().BeTrue();
//            x.Message.Should().Be(Messages.Updated);
//        }

//        [Test]
//        public async Task Visit_DeleteCommand_Success()
//        {
//            //Arrange
//            var command = new DeleteVisitCommand();

//            _visitRepository.Setup(x => x.GetAsync(It.IsAny<Expression<Func<Visit, bool>>>()))
//                        .ReturnsAsync(new Visit() { /*TODO:propertyler buraya yazılacak VisitId = 1, VisitName = "deneme"*/});

//            _visitRepository.Setup(x => x.Delete(It.IsAny<Visit>()));

//            var handler = new DeleteVisitCommandHandler(_visitRepository.Object, _mediator.Object);
//            var x = await handler.Handle(command, new System.Threading.CancellationToken());

//            _visitRepository.Verify(x => x.SaveChangesAsync());
//            x.Success.Should().BeTrue();
//            x.Message.Should().Be(Messages.Deleted);
//        }
//    }
//}

