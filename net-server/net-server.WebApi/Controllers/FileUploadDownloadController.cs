using System;
using System.Collections.Generic;
using System.IO;
using System.IO.Compression;
using System.Linq;
using System.Text;
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

      var zipFileName = "some-zip-file.zip";
      //Create a zip file made up of multiple files, one of them being a text file and the 
      //other zips.
      //This is the text file that will be added.
      var jsonString = @"{'Message': This is a text string which will be in the text file of the download.}";
      var jsonStringFileName = "json-file.json";

      using (MemoryStream ms = new MemoryStream())
      {
        using (var archive = new ZipArchive(ms, ZipArchiveMode.Create, true))
        {
          //First the string that represents JSON.
          var zipArchiveEntry = archive.CreateEntry(jsonStringFileName, CompressionLevel.Fastest);
          using (var zipStream = zipArchiveEntry.Open())
          {

            byte[] bytes = Encoding.UTF8.GetBytes(jsonString);
            zipStream.Write(bytes, 0, bytes.Length);
          }

          //Now add a file from the disk.
          zipArchiveEntry = archive.CreateEntry("someZipFile.zip", CompressionLevel.Fastest);
          using (var zipStream = zipArchiveEntry.Open())
          {
            byte[] bytes = System.IO.File.ReadAllBytes(@"D:\temp\someZipFile.zip");
            zipStream.Write(bytes, 0, bytes.Length);
          }
        }

        Response.Headers["Content-Disposition"] = $"attachment; filename={zipFileName}";
        var fileContentResult = new FileContentResult(ms.ToArray(), "application/zip")
        {
          FileDownloadName = $"{zipFileName}"
        };
        return fileContentResult;


      }
    }

    // POST api/values
    [HttpPost]
    public async Task<IActionResult> Post([FromForm] IFormFileCollection files)
    {

      //var files = Request.Form.Files;
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