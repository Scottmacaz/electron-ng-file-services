import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import {NgxElectronModule} from 'ngx-electron';
import { OpenFileComponent } from './open-text-file/open-text-file.component';
import { SaveFileComponent } from './save-text-file/save-text-file.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import {HttpModule} from '@angular/http';
import { FileDownloadComponent } from './file-download/file-download.component';
import { SaveZipFileComponent } from './save-zip-file/save-zip-file.component';

@NgModule({
  declarations: [
    AppComponent,
    OpenFileComponent,
    SaveFileComponent,
    FileUploadComponent,
    FileDownloadComponent,
    SaveZipFileComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgxElectronModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
