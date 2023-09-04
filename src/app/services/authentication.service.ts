import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { TokenModel } from "./token.model";
import { Constantes } from "../models/constantes.model";

@Injectable()
export class AuthenticationService {

    private static GRANT_TYPE_PARAM : string = 'grant_type';
    private static USER_NAME_PARAM : string = 'username';
    private static PASSWORD_PARAM : string = 'password';

    private URL : string = "/oauth/token";
    private token : TokenModel = new TokenModel();

    /**
     * Estas propiedades deben venir de properties.
     */
    private usuarioOauth : string = "cliente";
    private passwordOauth : string = "password-oauth";

    constructor(private router: Router,
                private httpClient : HttpClient){}

    /**
     * Realiza la llamada al servicio de autenticación en el
     * backend.
     * 
     * @param user 
     * @param password 
     */            
    login (user : string, password : string){

        const body = new URLSearchParams();
        body.set(AuthenticationService.GRANT_TYPE_PARAM, 'password');
        body.set(AuthenticationService.USER_NAME_PARAM, user);
        body.set(AuthenticationService.PASSWORD_PARAM, password);

        const params = {headers : this.getHeaders()};
        return this.httpClient        
            .post<TokenModel>(this.URL
                , body
                , params
            )
            .subscribe({
                next : (response : TokenModel)=>{
                  this.token = response;
                  this.router.navigate([Constantes.PATH_FILES_LIST]);
                }, 
                error : (ee : HttpErrorResponse) => {
                  console.error(ee);
                  console.error ("status -->" + ee.status)
                  this.router.navigate([Constantes.PATH_LOGIN]);
                }
              }
            );
    }

    private getHeaders() : HttpHeaders {
      return new HttpHeaders({
        'Content-Type' : 'application/x-www-form-urlencoded',
        'Authorization' : 'Basic ' + btoa(this.usuarioOauth + ':' + this.passwordOauth)
      });
    }

    getToken() : string {
        return this.token.access_token;
    }

    isAuthenticated() : boolean {
      return this.token.access_token != null;
    }
}