import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthenticationService } from "../services/authentication.service";

/**
 * Interceptor HTTP que inserta un token JWT en la cabecera
 * si este no se ha incluído.
 * Para que funcione, es necesario configurarlo en el app.module.ts
 */
@Injectable()
export class JwtAuthInterceptor implements HttpInterceptor {

    constructor(private authenticationService : AuthenticationService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.authenticationService.isAuthenticated()){
            let token = this.authenticationService.getToken();
            req = req.clone({
                setHeaders: {
                    Authorization :'Bearer ' + token
                }
            });
        }

        return next.handle(req);
    }
    
    private getHeaders() : HttpHeaders {
        return new HttpHeaders().set('Authorization', 'Bearer ' + this.authenticationService.getToken());
    }
}