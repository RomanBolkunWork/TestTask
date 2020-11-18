
using CsvHelper;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using TestTask.DTO.Models;

namespace TestTask.BLL.Services
{
    public class AggregationService : IAggregationService
    {
        public AggregationService()
        { }

        public async Task<List<AggregatedItemDto>> ProcessDataFromFileAsync(IFormFile file)
        {
            List<ExcelItemInputDto> rawData;
            using (var reader = new StreamReader(file.OpenReadStream()))
            using (var csv = new CsvReader(reader, CultureInfo.InvariantCulture))
            {
                csv.Configuration.HasHeaderRecord = false;
                rawData = csv.GetRecords<ExcelItemInputDto>().ToList();
            }

            return CalculateComplexPercentages(rawData);
        }

        private List<AggregatedItemDto> CalculateComplexPercentages(List<ExcelItemInputDto> data)
        {
            double accumulator = 1;

            return data.Select(x => {

                accumulator *= (1 + x.Percentage / 100);

                return new AggregatedItemDto
                {
                    Date = x.Date,
                    Value = 100 * (accumulator - 1)
                };
            }).ToList();
        }
    }
}
