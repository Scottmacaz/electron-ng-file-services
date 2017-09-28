import { Component, OnInit, ElementRef } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { HttpHeaders } from '@angular/common/http'

//import the do function to be used with the http library.
import "rxjs/add/operator/do";
//import the map function to be used with the http library
import "rxjs/add/operator/map";

const URL = 'http://localhost:5000/api/fileuploadDownload';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css'],
  providers: []
})
export class FileUploadComponent implements OnInit {

  constructor(private http: Http, private el: ElementRef) { }

  ngOnInit() {
  }

  upload() {

    let inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#fileToUpload');
    let fileCount: number = inputEl.files.length;
    let formData = new FormData();
    if (fileCount == 0) {
      return;
    }

    formData.append('fileToUpload', inputEl.files.item(0));
    var headers = new Headers();

    headers.delete("Content-Type");
    let options = new RequestOptions({ headers: headers });

    this.http
      .post(URL, formData, options)
      .map((res: Response) => res.json())
      .subscribe(
      (success) => {
        alert("Success! " + success._body);
      },
      (error) => alert("Error! " + error));
  }
}
