import { Component, OnInit } from '@angular/core';
import { FileSystemService } from '../services/file-system.service';
@Component({
  selector: 'app-open-file',
  templateUrl: './open-file.component.html',
  styleUrls: ['./open-file.component.css'],
  providers: [FileSystemService]
})
export class OpenFileComponent implements OnInit {

  constructor(private fileSystemService: FileSystemService) { }
  fileContents: string;
  fileName: string;

  ngOnInit() {  }

  openFile() {

    let response = this.fileSystemService.openFile();
    debugger;
    if (response.hasError) {
      //Put a status somewhere ....
      alert(`Error Opening File: ${response.error}`);
      return;

    }
    this.fileName = response.fileName;
    this.fileContents = response.fileContents;
  }

}
