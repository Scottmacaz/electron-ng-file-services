import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import {NgxElectronModule} from 'ngx-electron';
import { OpenFileComponent } from './open-file/open-file.component';
import { SaveFileComponent } from './save-file/save-file.component';


@NgModule({
  declarations: [
    AppComponent,
    OpenFileComponent,
    SaveFileComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgxElectronModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
