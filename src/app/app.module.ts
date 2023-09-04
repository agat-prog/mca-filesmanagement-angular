import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AuthenticationService } from './services/authentication.service';
import { FilesListComponent } from './files-list/files-list.component';
import { ErrorsComponent } from './errors/errors.component';
import { FilesService } from './services/files.service';
import { FileComponent } from './file/file.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table'
import {MatDividerModule} from '@angular/material/divider';
import {MatSelectModule} from '@angular/material/select';
import {MatGridListModule} from '@angular/material/grid-list';
import { JwtAuthInterceptor } from './interceptors/jwtAuthInterceptor.interceptors';
import { SpinnerService } from './services/spinner.service';
import { SpinnerInterceptor } from './interceptors/spinner.interceptors';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { FileNewComponent } from './file/filenew.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FilesListComponent,
    ErrorsComponent,
    FileComponent,
    FileNewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatFormFieldModule, MatInputModule, MatIconModule,
    MatTableModule,
    MatDividerModule,
    MatSelectModule,
    MatGridListModule,
    MatProgressSpinnerModule
  ],
  providers: [
    AuthenticationService, 
    FilesService,
    SpinnerService,
    { provide : HTTP_INTERCEPTORS, useClass : JwtAuthInterceptor, multi : true },
    { provide : HTTP_INTERCEPTORS, useClass : SpinnerInterceptor, multi : true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
