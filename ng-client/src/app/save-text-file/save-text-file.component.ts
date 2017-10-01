import { Component, OnInit } from '@angular/core';
import { FileSystemService } from '../services/file-system.service';

@Component({
  selector: 'app-save-text-file',
  templateUrl: './save-text-file.component.html',
  styleUrls: ['./save-text-file.component.css'],
  providers: [FileSystemService]
})
export class SaveFileComponent implements OnInit {

  fileContents: string;
  fileName: string;

  constructor(private fileSystemService: FileSystemService) { }

  ngOnInit() {
  }

  saveFile() {
debugger;
    let response = this.fileSystemService.saveFile(this.fileContents);
    if (response.hasError) {
      alert(`Error Creating File: ${response.error}`);
    }
    return false;
  }

}
