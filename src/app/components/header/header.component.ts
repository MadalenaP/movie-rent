import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { UserState } from '../../state-management/user/user.state';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Select(UserState.isAuthenticated) isAuthenticated$: Observable<boolean>;

  constructor(
    private userService: UserService
  ) { }

  public logout(): void {
    this.userService.logout();
  }
}
