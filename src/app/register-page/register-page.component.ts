import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserAuthService } from '../user-auth.service';


@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent implements OnInit{
  validationErrors: any = [];
  userData = new FormGroup ({
    name: new FormControl<string>(''),
    email: new FormControl<string>(''),
    password: new FormControl<string>(''),
    confirmPassword: new FormControl<string>(''),
    isSubmitting: new FormControl<boolean>(false),
  });

  constructor(public userAuthService: UserAuthService, private router: Router) {}
    
    ngOnInit(): void {
      if(localStorage.getItem('token') !="" && localStorage.getItem('token') != null){
        this.router.navigateByUrl('/dashboard');
      }
    }

    registerAction() {
      this.userData.controls['isSubmitting'].setValue(true);
      let payload = {
        name: this.userData.controls['name'].value,
        email: this.userData.controls['email'].value,
        password: this.userData.controls['password'].value,
        confirmPassword: this.userData.controls['confirmPassword'].value
      }

      this.userAuthService.register(payload).then((response: any) => {
        localStorage.setItem('token', response.token);
        this.router.navigateByUrl('/dashboard');
        return response;
      }).catch((error: any) => {
        this.userData.controls['isSubmitting'].setValue(false);
        if (error.response.data.errors != undefined) {
          this.validationErrors = error.response.data.errors;
        }

        return error;
      })
    }

    protected isFormControlEmpty(formName: string): boolean {
      return this.userData.get(formName)?.value;
    }
}
