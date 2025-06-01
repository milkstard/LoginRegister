import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { UserAuthService } from '../user-auth.service';
import { User } from '../user/user';

@Component({
  selector: 'app-dash-board-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './dash-board-page.component.html',
  styleUrl: './dash-board-page.component.css'
})
export class DashBoardPageComponent {
  user!: User;

  constructor(private router: Router, public userAuthService: UserAuthService) { }
  ngOnInit(): void {
    if (localStorage.getItem('token') == "" || localStorage.getItem('token') == null) {
      this.router.navigateByUrl('/');
    }else {
      this.userAuthService.getUser().then((response: any) => {
        this.user = response
      })
    }
  }

  logoutAction () {
    this.userAuthService.logout().then(() => {
      localStorage.setItem('token', "");
      this.router.navigateByUrl('/');
    }).catch(() => {
      localStorage.setItem('token',"");
      this.router.navigateByUrl('/');
    })
  }
}
