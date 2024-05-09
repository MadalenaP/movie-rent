import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

	constructor(
    private userService: UserService,
    private router: Router) {}

	canActivate(route: ActivatedRouteSnapshot): boolean {
		if (this.userService.isLoggedIn()) {
			return true;
		} else {
      this.userService.logout();
      this.router.navigate(['login']);
			return false;
		}
	}
}
