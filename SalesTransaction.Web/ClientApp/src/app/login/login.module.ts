import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { LoginService, } from './login.service';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';





const routes: Routes = [
    {
      path: '',
      component: LoginComponent
    }
  ];

  @NgModule({
    imports: [
      CommonModule,
      RouterModule.forChild(routes),
      ReactiveFormsModule,
      MatFormFieldModule,
      MatInputModule,
      MatButtonModule,
      FormsModule,
      MatSnackBarModule,
      HttpClientModule,
      MatToolbarModule,
      MatCardModule
    ],
    declarations: [LoginComponent],
    providers: [LoginService],
    exports: [
      LoginComponent,
      FormsModule,
      ReactiveFormsModule,
      MatFormFieldModule,
      MatInputModule,
      MatButtonModule,
      MatCardModule,
      MatToolbarModule,
      HttpClientModule,
      MatSnackBarModule
    ]
  })
export class LoginModule { }