import { Injectable } from '@angular/core';
import {ElectronService} from 'ngx-electron';


@Injectable()
export class FileSystemService {

  constructor(private electronService: ElectronService) { }

  openFile() {
    
    if (!this.electronService.isElectronApp) {
      alert("Open File only works in an electron app!");
      
      return {
        "isSuccess": false,
        "error" : "OPen File currently only works in an electron app!"
      }
    }
    
    console.log("Opening File ...");
    let response =  this.electronService
    .ipcRenderer.sendSync('open-file');
    console.log(`fileName: ${response.fileName}`);
    console.log(`fileContents: ${response.fileContents}`);

    return {
      "isSucess" : true,
      "fileName" : response.fileName,
      "fileContents" : response.fileContents
    }
  
  }

  saveFile(fileContents: string){
    if (!this.electronService.isElectronApp) {
      alert("Save File only works in an electron app!");
      return {
        "isSuccess": false,
        "error" : "OPen File currently only works in an electron app!"
      }
    }

    console.log(`Saving File Contents: ${fileContents} `);
    let response = this.electronService.ipcRenderer.sendSync('save-file', fileContents);
    return response;
  }

}
