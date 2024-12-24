
using Business.Handlers.Visits.Commands;
using Business.Handlers.Visits.Queries;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Entities.Concrete;
using System.Collections.Generic;
using System;

namespace WebAPI.Controllers
{
    /// <summary>
    /// Visits If controller methods will not be Authorize, [AllowAnonymous] is used.
    /// </summary>
    [Route("api/v{version:apiVersion}/[controller]")]
    [ApiController]
    public class VisitsController : BaseApiController
    {
        ///<summary>
        ///List Visits
        ///</summary>
        ///<remarks>Visits</remarks>
        ///<return>List Visits</return>
        ///<response code="200"></response>
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<Visit>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpGet("getall")]
        public async Task<IActionResult> GetList()
        {
            var result = await Mediator.Send(new GetVisitsQuery());
            if (result.Success)
            {
                return Ok(result.Data);
            }
            return BadRequest(result.Message);
        }
        ///<summary>
        ///List Visits
        ///</summary>
        ///<remarks>Visits</remarks>
        ///<return>List Visits</return>
        ///<response code="200"></response>
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<Visit>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpGet("getpersonnelvisitlist")]
        public async Task<IActionResult> GetPersonnelVisitList()
        {
            var result = await Mediator.Send(new GetPersonnelVisitsQuery());
            if (result.Success)
            {
                return Ok(result.Data);
            }
            return BadRequest(result.Message);
        }
        ///<summary>
        ///List Visits
        ///</summary>
        ///<remarks>Visits</remarks>
        ///<return>List Visits</return>
        ///<response code="200"></response>
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<Visit>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpGet("gettodayvisitlist")]
        public async Task<IActionResult> GetTodayVisitList()
        {
            var result = await Mediator.Send(new GetTodayVisitsQuery());
            if (result.Success)
            {
                return Ok(result.Data);
            }
            return BadRequest(result.Message);
        }
        ///<summary>
        ///It brings the details according to its id.
        ///</summary>
        ///<remarks>Visits</remarks>
        ///<return>Visits List</return>
        ///<response code="200"></response>  
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Visit))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpGet("getbyid")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var result = await Mediator.Send(new GetVisitQuery { Id = id });
            if (result.Success)
            {
                return Ok(result.Data);
            }
            return BadRequest(result.Message);
        }
        ///<summary>
        ///It brings the details according to its id.
        ///</summary>
        ///<remarks>Visits</remarks>
        ///<return>Visits List</return>
        ///<response code="200"></response>  
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Visit))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpGet("getByDate")]
        [AllowAnonymous]
        public async Task<IActionResult> GetByDate( string startDate,string endDate)
        {
            var result = await Mediator.Send(new GetVisitsByDateQuery { StartDate=startDate,EndDate=endDate });
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result.Message);
        }

		/// <summary>
		/// Belirtilen tarih için Visit ve MultiVisiters birleşik listesini getirir.
		/// </summary>
		/// <param name="date">Tarih (dd-MM-yyyy formatında)</param>
		/// <returns>Visit ve MultiVisiters birleşik DTO listesi</returns>
		[HttpGet("GetVisitsWithMultiVisits")]
		public async Task<IActionResult> GetVisitsWithMultiVisits([FromQuery] string date)
		{
			if (string.IsNullOrWhiteSpace(date))
			{
				return BadRequest("Tarih parametresi boş olamaz.");
			}
			var result = await Mediator.Send(new GetVisitsMultiVisitsQuery(date));
			if (result.Success)
			{
				return Ok(result.Data);
			}
			return BadRequest(result.Message);
		}
		/// <summary>
		/// Add Visit.
		/// </summary>
		/// <param name="createVisit"></param>
		/// <returns></returns>
		[Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(string))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpPost]
        public async Task<IActionResult> Add([FromBody] CreateVisitCommand createVisit)
        {
            var result = await Mediator.Send(createVisit);
            if (result.Success)
            {
                return Ok(result.Message);
            }
            return BadRequest(result.Message);
        }
        /// <summary>
		/// Add Visit.
		/// </summary>
		/// <param name="pedestrianEntrance"></param>
		/// <returns></returns>
		[Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(string))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpPost("pedestrianEntrance")]
        [AllowAnonymous]
        public async Task<IActionResult> AddPedestrianEntrance([FromBody] PedestrianEntranceCommand pedestrianEntrance)
        {
            var result = await Mediator.Send(pedestrianEntrance);
            if (result.Success)
            {
                return Ok(result.Message);
            }
            return BadRequest(result.Message);
        }
        /// <summary>
        /// Add Visit.
        /// </summary>
        /// <param name="vehicleEntranceCommand"></param>
        /// <returns></returns>
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(string))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpPost("vehicleEntrance")]
    
        public async Task<IActionResult> AddVehicleEntrance([FromBody] VehicleEntranceCommand vehicleEntranceCommand)
        {
            var result = await Mediator.Send(vehicleEntranceCommand);
            if (result.Success)
            {
                return Ok(result.Message);
            }
            return BadRequest(result.Message);
        }
        /// <summary>
        /// Update Visit.
        /// </summary>
        /// <param name="updateVisit"></param>
        /// <returns></returns>
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(string))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpPut]
        public async Task<IActionResult> Update([FromBody] UpdateVisitCommand updateVisit)
        {
            var result = await Mediator.Send(updateVisit);
            if (result.Success)
            {
                return Ok(result.Message);
            }
            return BadRequest(result.Message);
        }
        /// <summary>
        /// Reject Visit.
        /// </summary>
        /// <param name="rejectVisit"></param>
        /// <returns></returns>
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(string))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpPut("rejectvisit")]
        public async Task<IActionResult> Update([FromBody] VisitRejectCommand rejectVisit)
        {
            var result = await Mediator.Send(rejectVisit);
            if (result.Success)
            {
                return Ok(result.Message);
            }
            return BadRequest(result.Message);
        }

        /// <summary>
        /// Delete Visit.
        /// </summary>
        /// <param name="deleteVisit"></param>
        /// <returns></returns>
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(string))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpDelete]
        public async Task<IActionResult> Delete([FromBody] DeleteVisitCommand deleteVisit)
        {
            var result = await Mediator.Send(deleteVisit);
            if (result.Success)
            {
                return Ok(result.Message);
            }
            return BadRequest(result.Message);
        }
    }
}
