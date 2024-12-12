
using Business.Handlers.BanuLogs.Commands;
using Business.Handlers.BanuLogs.Queries;
using Business.Services.ConvertPdfService.Concrete;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Entities.Concrete;
using System.Collections.Generic;
using System;
using Core.Utilities.Results;

using System.Linq;


namespace WebAPI.Controllers
{
    /// <summary>
    /// BanuLogs If controller methods will not be Authorize, [AllowAnonymous] is used.
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class BanuLogsController : BaseApiController
    {
        ///<summary>
        ///List BanuLogs
        ///</summary>
        ///<remarks>BanuLogs</remarks>
        ///<return>List BanuLogs</return>
        ///<response code="200"></response>
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<BanuLog>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpGet("getall")]
        public async Task<IActionResult> GetList()
        {
            var result = await Mediator.Send(new GetBanuLogsQuery());
            if (result.Success)
            {
                return Ok(result.Data);
            }
            return BadRequest(result.Message);
        }
        [HttpGet]
        [Route("secured")]
        public IActionResult GetSecuredProducts()
        {
            var data = new List<string> { "ApiKeys" };
            return Ok(data);
        }
      
        ///<summary>
        ///It brings the details according to its id.
        ///</summary>
        ///<remarks>BanuLogs</remarks>
        ///<return>BanuLogs List</return>
        ///<response code="200"></response>  
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(BanuLog))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpGet("getbyid")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var result = await Mediator.Send(new GetBanuLogQuery { Id = id });
            if (result.Success)
            {
                return Ok(result.Data);
            }
            return BadRequest(result.Message);
        } 
        
        
        ///<summary>
        ///It brings the details according to its full name.
        ///</summary>
        ///<remarks>BanuLogs</remarks>
        ///<return>BanuLogs List By Fullname</return>
        ///<response code="200"></response>  
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<BanuLog>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpGet("getbyfullname")]
        
        public async Task<IActionResult> GetByPersonelFullName(string personelFullName, string? queryStartDate=null, string? queryEndDate = null)
        {
            var result = await Mediator.Send(new GetBanuLogsByFullNameQuery
            {
                FullName = personelFullName,
                QueryStartDate = queryStartDate,
                QueryEndDate = queryEndDate
            });
            if (result.Success)
            {
                return Ok(result.Data);
            }
            return BadRequest(result.Message);
        }
        ///<summary>
        ///It brings the details according to its page number.
        ///</summary>
        ///<remarks>BanuLogs</remarks>
        ///<return>BanuLogs List By Paging</return>
        ///<response code="200"></response>  
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(PagingResult<BanuLog>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpGet("getbypaging")]
        
        public async Task<IActionResult> GetByPagination(int page)
        {
            var result = await Mediator.Send(new GetBanuLogsByPagingQuery
            {
                page = page
            });
            if (result.Success)
            {
                return Ok(result.Data);
            }
            return BadRequest(result.Message);
        }

        [Produces("application/pdf", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(BanuLog))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpGet("getbypdf")]
        [AllowAnonymous]
        public async Task<IActionResult> GetByDate(String date)
        {
            var result = await Mediator.Send(new GetBanuLogsByPdfQuery { QueryDate = date });
            if (result.Success)
            {   
                ConvertPdfService convertPdfService = new ConvertPdfService();
                if (result.Data.Count() > 35)
                {
                    var logGroups = convertPdfService.SplitLogs(result.Data, 35);

                    var zipBytes = convertPdfService.GenerateZipWithPdfs(logGroups, date);

                    return File(zipBytes, "application/zip", $"BanuLogs_{date}.zip");
                }
                else
                {
                    var pdfBytes = convertPdfService.GeneratePdf(result.Data.ToList(), 1, date);

                    return File(pdfBytes, "application/pdf", $"BanuLogs_{date}.pdf");
                }
            }

            return BadRequest(result.Message);
        } 
        

        /// <summary>
        /// Add BanuLog.
        /// </summary>
        /// <param name="createBanuLog"></param>
        /// <returns></returns>
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(string))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpPost]
        public async Task<IActionResult> Add([FromBody] CreateBanuLogCommand createBanuLog)
        {
            var result = await Mediator.Send(createBanuLog);
            if (result.Success)
            {
                return Ok(result.Message);
            }
            return BadRequest(result.Message);
        }

        /// <summary>
        /// Update BanuLog.
        /// </summary>
        /// <param name="updateBanuLog"></param>
        /// <returns></returns>
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(string))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpPut]
        public async Task<IActionResult> Update([FromBody] UpdateBanuLogCommand updateBanuLog)
        {
            var result = await Mediator.Send(updateBanuLog);
            if (result.Success)
            {
                return Ok(result.Message);
            }
            return BadRequest(result.Message);
        }

        /// <summary>
        /// Delete BanuLog.
        /// </summary>
        /// <param name="deleteBanuLog"></param>
        /// <returns></returns>
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(string))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpDelete]
        public async Task<IActionResult> Delete([FromBody] DeleteBanuLogCommand deleteBanuLog)
        {
            var result = await Mediator.Send(deleteBanuLog);
            if (result.Success)
            {
                return Ok(result.Message);
            }
            return BadRequest(result.Message);
        }
    }
}
