import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor() { }
  
  public login(data: any): Promise<any> {
    let payload = {
      email: data.email,
      password: data.password
    }

    return axios.post('/api/login', payload)
  }

  public register(data: any): Promise<any> {
    let payload = {
      name: data.name,
      email: data.email,
      password: data.password,
      password_confirmation: data.confirmPassword
    }

    return axios.post('/api/register', payload)
  }

  public getUser(): Promise<any> {
    return axios.get('/api/user', { 
      headers:{Authorization: 'Bearer ' + localStorage.getItem('token')}
    });
  }

  public logout(): Promise<any> {
    return axios.post('/api/logout', {}, {
      headers:{Authorization: 'Bearer ' + localStorage.getItem('token')}
    });
  }
}
