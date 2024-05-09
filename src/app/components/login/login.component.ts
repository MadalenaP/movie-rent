import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UserService } from '../../services/user.service';

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
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.setUpFormGroup();
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
      this.user.login(this.loginForm.value).subscribe(test => {
        console.log('res', test)
      })
    }
  }

}
