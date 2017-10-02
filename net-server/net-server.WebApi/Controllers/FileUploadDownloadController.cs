using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Net.Http.Headers;

namespace net_core_server.Controllers
{
  [Route("api/[controller]")]
  public class FileUploadDownloadController : Controller
  {
    
    //[HttpGet("{id}")]
    //public async Task<IActionResult> Get(int id)
    [HttpGet()]
    //public async Task<IActionResult> Get()
    public IActionResult Get()
    {

      //var fileName = @"/tmp/SomeZipFile2.zip";
      var fileName = @"D:/tmp/SomeZipFile.zip";

    Response.Headers["Content-Disposition"] = $"attachment; filename=SomeZipFile2.zip";
    var fileContentResult = new FileContentResult(System.IO.File.ReadAllBytes(fileName), "application/zip")
    {
        FileDownloadName = $"SomeZipFile2.zip"
    };
    return fileContentResult;
    //   var stream = new FileStream(fileName, FileMode.Open);
    //  return new FileStreamResult(stream, new MediaTypeHeaderValue("application/zip"))
    // {
    //     FileDownloadName = "SomeFile2.zip"
    // };

    
    

    }

    // POST api/values
    [HttpPost]
    public async Task<IActionResult> Post()
    {

      var files = Request.Form.Files;
      if (files == null)
      {
        return BadRequest("files is null.");
      }

      var file = files.FirstOrDefault();
      if (file == null)
      {
        return BadRequest("Files is null");
      }
      long size = file.Length;
      var contentType = file.ContentType;
      if (contentType != "application/x-zip-compressed" &&
      contentType != "application/zip")
      {
        return BadRequest("Content type must be: application/x-zip-compressed");
      }

      // full path to file in temp location
      var fileName = Path.GetTempFileName();

      if (file.Length > 0)
      {
        using (var stream = new FileStream(fileName, FileMode.Create))
        {
          await file.CopyToAsync(stream);
        }
      }

      //Do whatever needs to be done using the zip file .....

      System.IO.File.Delete(fileName);

      return Ok(new { size, fileName });
    }

  }
}