import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserAuthService } from '../user-auth.service';
import {FormControl, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent implements OnInit{
  validationErrors: any = [];
  userData = new FormGroup({
    email: new FormControl<string>(''),
    password: new FormControl<string>(''),
    isSubmitting: new FormControl<boolean>(false),
  });
  
  constructor(public userAuthService: UserAuthService, private router: Router) {}
    ngOnInit(): void {
      if(localStorage.getItem('token') != "" && localStorage.getItem('token') !=null) {
        this.router.navigateByUrl('/dashboard');
      }
    }

    loginAction() {
      this.userData.controls.isSubmitting.setValue(true);
      let payload = {
        email: this.userData.controls.email.value,
        password: this.userData.controls.password.value
      }
      this.userAuthService.login(payload).then((response: any) => {
        localStorage.setItem('token', response.token);
        this.router.navigateByUrl('/dashboard');
        return response;
      }).catch((error: any) => {
        this.userData.controls.isSubmitting.setValue(false);
        this.validationErrors = error.response.data.error || ['An error occurred during login.'];
        return error;
      })
    }
}
