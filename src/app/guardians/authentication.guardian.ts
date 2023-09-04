import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { Constantes } from "../models/constantes.model";
import { AuthenticationService } from "../services/authentication.service";

export function authenticationGuard(): CanActivateFn {
    return () => {
      const loginService: AuthenticationService = inject(AuthenticationService);
      
      if (loginService.isAuthenticated() ) {
        return true;
      }

      const router : Router = inject(Router);
      router.navigate([Constantes.PATH_LOGIN]);
      return false;
    };
  }