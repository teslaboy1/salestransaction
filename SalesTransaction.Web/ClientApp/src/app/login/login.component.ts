import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit, OnDestroy, AfterViewInit {

  loginForm: FormGroup;
  errorMessage: any;
  errorMessageType: any = {
    invalidForm: 'Invalid form value',
    invalidUserName: 'Please enter correct Email Id',
    invalidLogin: 'Invalid name or password'
  }

  constructor(public fb: FormBuilder, public loginService: LoginService, public router: Router, public snackbar: MatSnackBar) { }


  ngOnInit() {

    this.loginForm = this.fb.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });

  }

  onLogin() {
    const loginData = this.loginForm.value;
    if ( this.loginForm.valid ) {
      this.loginService.getLogin(loginData).subscribe((response: any) => {
        if ( response ) {
          this.openSnackBar('Log in success', 'close')
          this.router.navigate(['/user-detail']);
        } else {
          this.errorMessage = this.errorMessageType.invalidForm;
        }
      });
    } else {
      this.errorMessage = this.errorMessageType.invalidForm;
    }
  }

  openSnackBar(message, action) {
    this.snackbar.open(message, action, {duration:  3000});
  }

  ngAfterViewInit(): void {
    this.loginForm.updateValueAndValidity();
  }

  ngOnDestroy(): void {
  }
}