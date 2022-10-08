import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() {
    this.generateToken();
  }

  saveToken(token:string){
    localStorage.setItem('token',token);
  }

  getToken(){
    return localStorage.getItem('token');
  }

  generateToken() {
    let token = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < charactersLength; i++) {
      token += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    this.saveToken(token);
  }

}
