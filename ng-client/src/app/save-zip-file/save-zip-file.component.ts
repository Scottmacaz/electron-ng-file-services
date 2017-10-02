import { Component, OnInit } from '@angular/core';
import { FileSystemService } from '../services/file-system.service';
import { Http, Response, RequestOptions, ResponseContentType, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';


const URL = 'http://localhost:5000/api/fileuploadDownload';

@Component({
  selector: 'app-save-zip-file',
  templateUrl: './save-zip-file.component.html',
  styleUrls: ['./save-zip-file.component.css'],
  providers: [FileSystemService]
})
export class SaveZipFileComponent implements OnInit {

  constructor(private http: Http, private fileSystemService: FileSystemService) { }

  ngOnInit() {
  }

  saveZipFile() {
    var headers = new Headers();

    headers.append('Content-Type', 'application/zip');
    headers.append('Accept', 'application/zip');
    headers.append('Access-Control-Allow-Origin', '*');

    let options = new RequestOptions({ headers: headers });
    options.responseType = ResponseContentType.ArrayBuffer;
    this.http
      .get(URL, options).toPromise()
      .then(httpResponse => this.saveUsingElectron(httpResponse));
  }

  private saveUsingElectron(httpResponse) {
    debugger;
    const contentDispositionHeader: string = httpResponse.headers.get('Content-Disposition');
    const parts: string[] = contentDispositionHeader.split(';');
    const filename = parts[1].split('=')[1];
    const blob = new Blob([httpResponse._body], { type: 'application/zip' });
    debugger;
    
    var byteArray = new Uint8Array(httpResponse._body);
    var buffer = new Buffer(byteArray.length);
    for (var i = 0; i < byteArray.length; i++) {
      
          buffer.writeUInt8(byteArray[i], i);
      
      }
    
    let response = this.fileSystemService.saveZipFile(buffer, filename);
    if (response.hasError) {
      alert(`Error Creating File: ${response.error}`);
    }
    return false;
   // saveAs(blob, filename);
  }


}
