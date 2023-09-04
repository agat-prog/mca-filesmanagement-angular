import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Constantes } from './models/constantes.model';
import { ErrorsComponent } from './errors/errors.component';
import { FileComponent } from './file/file.component';
import { FilesListComponent } from './files-list/files-list.component';
import { LoginComponent } from './login/login.component';
import { authenticationGuard } from './guardians/authentication.guardian';
import { FileNewComponent } from './file/filenew.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: Constantes.PATH_LOGIN, component: LoginComponent},
  {path: Constantes.PATH_FILES_LIST, component: FilesListComponent, canActivate: [authenticationGuard()]},
  {path: Constantes.PATH_FILE_DETAIL, component: FileComponent, canActivate: [authenticationGuard()]},
  {path: Constantes.PATH_FILE_NEW, component: FileNewComponent, canActivate: [authenticationGuard()]},
  {path: Constantes.PATH_ANY, component: ErrorsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
