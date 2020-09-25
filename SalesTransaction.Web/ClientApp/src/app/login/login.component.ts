import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MvLogin } from './login.model';
import { UtilityService } from 'src/core/services/utility.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit, OnDestroy, AfterViewInit {

  loginForm: FormGroup;
  login: MvLogin = <MvLogin>{};
  errorMessage: any;

  constructor(public fb: FormBuilder,
              public ls: LoginService,
              public router: Router,
              public snackbar: MatSnackBar,
              private us: UtilityService
              ) { }


  ngOnInit() {

    this.loginForm = this.fb.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });

  }

  submitForm() { // call server/api and authenticate

    this.errorMessage = '';
    if (this.loginForm.valid) {

      // const json = this.loginForm.value;
      this.login.userName = this.loginForm.get('userName').value.trim();
      this.login.password = this.loginForm.get('password').value.trim();

      this.ls.getLogin(this.login).subscribe((response: any) => {

        if (response) {

          this.us.openSnackBar('Login Successful', 'success');
          this.router.navigate(['/user-detail']);
        } else {

          this.errorMessage = 'Invalid UserName or Password!';
        }
      });
    } else {

      this.errorMessage = 'Invalid Form!';
    }
  }

  ngAfterViewInit() {

    this.loginForm.updateValueAndValidity();
  }

  ngOnDestroy() {

  }
}
