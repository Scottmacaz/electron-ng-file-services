import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import {NgxElectronModule} from 'ngx-electron';
import { OpenFileComponent } from './open-file/open-file.component';
import { SaveFileComponent } from './save-file/save-file.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import {HttpModule} from '@angular/http';
import { FileDownloadComponent } from './file-download/file-download.component';

@NgModule({
  declarations: [
    AppComponent,
    OpenFileComponent,
    SaveFileComponent,
    FileUploadComponent,
    FileDownloadComponent

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
