import { Injectable } from '@angular/core';
import { ElectronService } from 'ngx-electron';


@Injectable()
export class FileSystemService {

  constructor(private electronService: ElectronService) { }

  openFile() {
debugger;
    if (!this.electronService.isElectronApp) {
      return {
        "hasError": true,
        "error": "openFile() currently only works in an electron app!",
        "fileName": "",
        "fileContents": ""
      }
    }

    console.log("Opening File ...");
    let response = this.electronService.ipcRenderer.sendSync('open-file');
    debugger;
    console.log(`fileName: ${response.fileName}`);
    console.log(`fileContents: ${response.fileContents}`);

    return {
      "hasError": false,
      "error": "",
      "fileName": response.fileName,
      "fileContents": response.fileContents
    }

  }

  saveTextFile(fileContents: string) {
    if (!this.electronService.isElectronApp) {
      return {
        "hasError": true,
        "error": "saveFile() currently only works in an electron app!"
      }
    }

    console.log(`Saving File Contents: ${fileContents} `);
    let response = this.electronService.ipcRenderer.sendSync('save-file', fileContents);
    return {
      "hasError": false,
      "error": ""
    };
  }

  saveZipFile(fileContents: any, fileName: string) {
    if (!this.electronService.isElectronApp) {
      return {
        "hasError": true,
        "error": "saveFile() currently only works in an electron app!"
      }
    }

    console.log(`Saving File Contents: ${fileContents} `);
    let response = this.electronService.ipcRenderer.sendSync('save-file', fileContents, fileName);
    return {
      "hasError": false,
      "error": ""
    };
  }

}
