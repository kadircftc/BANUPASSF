
using Business.Handlers.VisitConfirms.Commands;
using Business.Handlers.VisitConfirms.Queries;
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
    /// VisitConfirms If controller methods will not be Authorize, [AllowAnonymous] is used.
    /// </summary>
    [Route("api/v{version:apiVersion}/[controller]")]
    [ApiController]
    public class VisitConfirmsController : BaseApiController
    {
        ///<summary>
        ///List VisitConfirms
        ///</summary>
        ///<remarks>VisitConfirms</remarks>
        ///<return>List VisitConfirms</return>
        ///<response code="200"></response>
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<VisitConfirm>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpGet("getall")]
        public async Task<IActionResult> GetList()
        {
            var result = await Mediator.Send(new GetVisitConfirmsQuery());
            if (result.Success)
            {
                return Ok(result.Data);
            }
            return BadRequest(result.Message);
        }

        ///<summary>
        ///List VisitConfirms
        ///</summary>
        ///<remarks>VisitConfirms</remarks>
        ///<return>List VisitConfirms</return>
        ///<response code="200"></response>
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<VisitConfirm>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpGet("getpersonelbyid")]
        public async Task<IActionResult> GetPersonelById()
        {
            var result = await Mediator.Send(new GetVisitConfirmsQuery());
            if (result.Success)
            {
                return Ok(result.Data);
            }
            return BadRequest(result.Message);
        }
        ///<summary>
        ///It brings the details according to its id.
        ///</summary>
        ///<remarks>VisitConfirms</remarks>
        ///<return>VisitConfirms List</return>
        ///<response code="200"></response>  
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(VisitConfirm))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpGet("getbyid")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var result = await Mediator.Send(new GetVisitConfirmQuery { Id = id });
            if (result.Success)
            {
                return Ok(result.Data);
            }
            return BadRequest(result.Message);
        }

        /// <summary>
        /// Add VisitConfirm.
        /// </summary>
        /// <param name="createVisitConfirm"></param>
        /// <returns></returns>
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(string))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpPost]
        public async Task<IActionResult> Add([FromBody] CreateVisitConfirmCommand createVisitConfirm)
        {
            var result = await Mediator.Send(createVisitConfirm);
            if (result.Success)
            {
                return Ok(result.Message);
            }
            return BadRequest(result.Message);
        }

        /// <summary>
        /// Update VisitConfirm.
        /// </summary>
        /// <param name="updateVisitConfirm"></param>
        /// <returns></returns>
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(string))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpPut]
        public async Task<IActionResult> Update([FromBody] UpdateVisitConfirmCommand updateVisitConfirm)
        {
            var result = await Mediator.Send(updateVisitConfirm);
            if (result.Success)
            {
                return Ok(result.Message);
            }
            return BadRequest(result.Message);
        }
        /// <summary>
        /// Update VisitConfirm.
        /// </summary>
        /// <param name="updateVisitConfirm"></param>
        /// <returns></returns>
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(string))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpPut("confirmVisit")]
        public async Task<IActionResult> ConfirmVisit(Guid visitId)
        {
            var result = await Mediator.Send(new ConfirmVisitCommand{VisitId= visitId });
            if (result.Success)
            {
                return Ok(result.Message);
            }
            return BadRequest(result.Message);
        }
        ///// <summary>
        ///// Delete VisitConfirm.
        ///// </summary>
        ///// <param name="deleteVisitConfirm"></param>
        ///// <returns></returns>
        //[Produces("application/json", "text/plain")]
        //[ProducesResponseType(StatusCodes.Status200OK, Type = typeof(string))]
        //[ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        //[HttpDelete]
        //public async Task<IActionResult> Delete([FromBody] DeleteVisitConfirmCommand deleteVisitConfirm)
        //{
        //    var result = await Mediator.Send(deleteVisitConfirm);
        //    if (result.Success)
        //    {
        //        return Ok(result.Message);
        //    }
        //    return BadRequest(result.Message);
        //}
    }
}
