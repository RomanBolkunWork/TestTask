using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using TestTask.BLL.Services;

namespace TestTask.API.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ProcessDataController: ControllerBase
    {
        private readonly IAggregationService service;

        public ProcessDataController(IAggregationService service)
        {
            this.service = service;
        }

        [HttpPost]
        public async Task<IActionResult> GetDataFromFile()
        {
            var file = Request.Form.Files.FirstOrDefault();

            if (Path.GetExtension(file.FileName).ToLower() != ".csv")
            {
                return BadRequest();
            }

            return Ok(await service.ProcessDataFromFileAsync(file));
        }
    }
}
