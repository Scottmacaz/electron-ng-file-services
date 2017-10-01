import { Component, OnInit } from '@angular/core';
import { FileSystemService } from '../services/file-system.service';
@Component({
  selector: 'app-open-text-file',
  templateUrl: './open-text-file.component.html',
  styleUrls: ['./open-text-file.component.css'],
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
