import { Component, OnInit } from '@angular/core';
import { Http, Response, RequestOptions, ResponseContentType, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { saveAs } from 'file-saver/FileSaver';


const URL = 'http://localhost:5000/api/fileuploadDownload';

@Component({
  selector: 'app-file-download',
  templateUrl: './file-download.component.html',
  styleUrls: ['./file-download.component.css']
})
export class FileDownloadComponent implements OnInit {

  constructor(private http: Http) { }

  ngOnInit() {
  }

  download() {
    var headers = new Headers();
    
        headers.append('Content-Type', 'application/zip');
        headers.append('Accept', 'application/zip');
        headers.append('Access-Control-Allow-Origin', '*');
         
        let options = new RequestOptions({ headers: headers });
        options.responseType = ResponseContentType.ArrayBuffer;
        this.http
        .get(URL, options).toPromise()
        .then (response => this.saveToFileSystem(response));
       
  }
  private saveToFileSystem(response){
    const contentDispositionHeader: string = response.headers.get('Content-Disposition');
    const parts: string[] = contentDispositionHeader.split(';');
    const filename = parts[1].split('=')[1];
    const blob = new Blob([response._body], { type: 'application/zip' });
    saveAs(blob, filename);
            }


}
