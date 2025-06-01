import { Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { DashBoardPageComponent } from './dash-board-page/dash-board-page.component';

export const routes: Routes = [
    {path:'', redirectTo: 'login', pathMatch: 'full'},
    {path: 'login', component: LoginPageComponent},
    {path: 'register', component: RegisterPageComponent},
    {path: 'dashboard', component: DashBoardPageComponent}
];
