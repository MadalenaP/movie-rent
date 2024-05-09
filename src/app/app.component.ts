import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { UserService } from './services/user.service';
import { LocalstorageService } from './services/localstorage.service';
import { HttpInterceptorService } from './services/http-interceptor.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  constructor(
    private userService: UserService,
    private localStorageService: LocalstorageService,
    private httpInterceptor: HttpInterceptorService
  ) {
  }
  
  ngOnInit(): void {
    if (this.userService.isLoggedIn()) {
      this.userService.updateState(this.localStorageService.getItem('id_token'));
    }
  }
}
