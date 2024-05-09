import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UserService } from '../../services/user.service';
import { Store } from '@ngxs/store';
import { Login } from '../../state-management/user/user.actions';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatFormFieldModule, FormsModule, ReactiveFormsModule, MatInputModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  protected loginForm: FormGroup;

  constructor(
    private user: UserService,
    private store: Store, 
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.setUpFormGroup();
  }

  private setUpFormGroup(): void {
    this.loginForm = this.formBuilder.group({
      username: new FormControl('deuscand3', Validators.required),
      password: new FormControl('3XC9s2WDwrPzZyzs9z3dFY', Validators.required)
    });
  }

  public onSubmit(): void {
    if(!this.loginForm.valid) {
      return;
    } else {
      console.log(this.loginForm.value)
      this.store.dispatch(new Login(this.loginForm.value));
    } 
  }

}
