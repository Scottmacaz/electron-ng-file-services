import { Component, OnInit } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
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

        this.http
        .get(URL, options).toPromise()
        .then (response => this.saveToFileSystem(response));
        
        

    // this.http
    // .get(URL, options)
    // .map((res: Response) => res['_body'])
    // .subscribe(
    // (success) => {
    //   alert("Success! " + success._body);
    // },
    // (error) => alert("Error! " + error));
  }
  private saveToFileSystem(response){
    debugger;
    const contentDispositionHeader: string = response.headers.get('Content-Disposition');
    const parts: string[] = contentDispositionHeader.split(';');
    const filename = parts[1].split('=')[1];
    const blob = new Blob([response._body], { type: 'text/plain' });
    saveAs(blob, filename);
            }


}
