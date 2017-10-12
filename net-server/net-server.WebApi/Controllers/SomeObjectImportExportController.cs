using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using net_server.Domain;
using Newtonsoft.Json;

namespace net_core_server.Controllers
{
    [Route("api/[controller]")]
    public class SomeObjectImportExportController : Controller
    {
        // GET api/values
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "some value" };
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var protocol = new Protocol();
            protocol.Steps = new List<Step>();
            protocol.Name = "Some Test Protocol";
            protocol.Steps.Add(new Step(){Name="Step ONe", Volume = 100 });

            var serializedProtocol = JsonConvert.SerializeObject(protocol);
            return Ok(serializedProtocol);

        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody]string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
