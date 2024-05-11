import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UserService } from '../../services/user.service';
import { Subject, catchError, filter, of, takeUntil, tap } from 'rxjs';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatFormFieldModule, FormsModule, ReactiveFormsModule, MatInputModule, TranslateModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit, OnDestroy {
  private destroy$: Subject<boolean> = new Subject<boolean>();
  protected loginForm: FormGroup;
  protected showErrorMessage: boolean = false;

  constructor(
    private userService: UserService,
    private router: Router,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.setUpFormGroup();
    this.formValueChangeListener();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  private formValueChangeListener(): void {
    this.loginForm.valueChanges.pipe(
      tap(() => this.showErrorMessage = false),
      takeUntil(this.destroy$)
    ).subscribe();
  }

  private setUpFormGroup(): void {
    this.loginForm = this.formBuilder.group({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    });
  }

  public onSubmit(): void {
    if(!this.loginForm.valid) {
      return;
    } else {
      this.login();
    } 
  }


  private login(): void {
    this.userService.login(this.loginForm.value).pipe(
      catchError((err) => {
        this.showErrorMessage = true;
        return of(err);
      }),
      filter((respose) => respose.access),
      tap(response => {
        this.userService.setUpSession(response);
        this.userService.updateState(response.access);
        this.router.navigate(['movies']);
      }),
      takeUntil(this.destroy$)
    ).subscribe();
  }

}
