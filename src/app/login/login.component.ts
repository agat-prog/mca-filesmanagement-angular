import { Component } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private authenticationService : AuthenticationService){}

  login(form :NgForm){
    const usuario = form.value.usuario;
    const password = form.value.password;    

    this.authenticationService.login(usuario, password);
  }
}
