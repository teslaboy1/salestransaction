import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MvLogin } from './login.model';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit, OnDestroy, AfterViewInit {

  loginForm: FormGroup;
  login: MvLogin = {} as MvLogin;
  errorMessage: any;
  errorMessageType: any = {
    invalidForm: 'Invalid form value',
    invalidLogin: 'Invalid name or password'
  };

  constructor(public fb: FormBuilder,
              public loginService: LoginService, 
              public router: Router, 
              public snackbar: MatSnackBar) { }


  ngOnInit() {

    this.loginForm = this.fb.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });

  }


  ngAfterViewInit(): void {
    this.loginForm.updateValueAndValidity();
  }

  ngOnDestroy(): void {
    throw new Error('not implemented.');
  }

  submitForm() { // call server/api and authenticate
    this.errorMessage = null;
    if (this.loginForm.valid) {

      // const json = this.loginForm.value;
      this.login.Username = this.loginForm.get('Username').value.trim();
      this.login.Password = this.loginForm.get('Password').value.trim();
      this.loginService.getLogin(this.login).subscribe((response: any) => {
        if (response) {

          this.openSnackBar('Login Success!', 'success');
          this.router.navigate(['/user-detail']);


        } else {

          this.errorMessage = this.errorMessageType.invalidLogin;
        }
      });
    } else {

      this.errorMessage = this.errorMessageType.invalidForm;
    }
  }
  openSnackBar(message, action) {
    this.snackbar.open(message, action, {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'right',
      panelClass: ['success']
    });
  }
}
