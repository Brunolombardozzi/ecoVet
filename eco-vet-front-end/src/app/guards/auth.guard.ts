import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { DataService } from "../service/data.service";
import { inject } from "@angular/core";

export const AuthGuard : CanActivateFn|any =
(route: ActivatedRouteSnapshot, state:RouterStateSnapshot) => {

  const authService = inject(DataService);
  const router = inject(Router)

  authService.userLoggeado() || router.navigate(["login"]);

  return true;
};
