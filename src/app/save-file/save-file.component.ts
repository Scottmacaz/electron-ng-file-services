import { Component, OnInit } from '@angular/core';
import {FileSystemService} from '../services/file-system.service';

@Component({
  selector: 'app-save-file',
  templateUrl: './save-file.component.html',
  styleUrls: ['./save-file.component.css']
})
export class SaveFileComponent implements OnInit {

  fileContents: string;
  fileName: string;

  constructor(private fileSystemService: FileSystemService) { }

  ngOnInit() {
  }

  saveFile(){
    
    console.log(`Saving File Contents: ${this.fileContents} `);
    let response = this.fileSystemService.saveFile(this.fileContents);
    if (response.)
  }

}
