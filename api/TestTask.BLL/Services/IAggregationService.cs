using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using TestTask.DTO.Models;

namespace TestTask.BLL.Services
{
    public interface IAggregationService
    {
        Task<List<AggregatedItemDto>> ProcessDataFromFileAsync(IFormFile file);
    }
}
