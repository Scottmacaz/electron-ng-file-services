import { Component } from '@angular/core';
import {ElectronService} from 'ngx-electron';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private electronService: ElectronService){
    if (this.electronService.isElectronApp) {
      console.log("Running in Electron.");
    }
    else {
      console.log("Not running in Electron");
    }


  }

  openFile() {
    console.log("Opening File ...");
    let fileContents: string = this.electronService
    .ipcRenderer.sendSync('open-file');
    console.log(`fileContents: ${fileContents}`);
  }

}
