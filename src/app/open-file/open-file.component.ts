import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-open-file',
  templateUrl: './open-file.component.html',
  styleUrls: ['./open-file.component.css']
})
export class OpenFileComponent implements OnInit {

  constructor() { }
  fileContents: string;
  fileName: string;
  
  ngOnInit() {
  }

  openFile() {
    if (!this.electronService.isElectronApp) {
      alert("Open File only works in an electron app!");
      return;
    }
    
    console.log("Opening File ...");
    let response =  this.electronService
    .ipcRenderer.sendSync('open-file');
    this.fileName = response.fileName;
    this.fileContents = response.fileContents;
    console.log(`fileName: ${this.fileName}`);
    console.log(`fileContents: ${this.fileContents}`);

  }

}
