import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { UserService } from './user.service';
import { Select } from '@ngxs/store';
import { Observable, tap } from 'rxjs';
import { UserState } from '../state-management/user/user.state';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard {
  @Select(UserState.isAdmin) isAdmin$: Observable<boolean>;
  private isAdmin: boolean = false;

	constructor(
    private userService: UserService,
    private router: Router) {
      this.isAdmin$.pipe(
        tap((isAdmin) => this.isAdmin = isAdmin)
      ).subscribe()
    }

	canActivate(route: ActivatedRouteSnapshot): boolean {
		if (this.isAdmin) {
			return true;
		} else {
      this.router.navigate(['/movies']);
			return false;
		}
	}
}
