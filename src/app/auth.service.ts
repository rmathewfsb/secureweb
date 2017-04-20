import { Injectable } from '@angular/core';
import { tokenNotExpired, JwtHelper } from 'angular2-jwt';
import { Router } from '@angular/router';
import { myConfig }        from './auth.config';

//Avoid name not found warnings
declare var Auth0Lock: any;

@Injectable()
export class AuthService {

    // Configure Auth0
    lock = new Auth0Lock(myConfig.clientID, myConfig.domain, {});
    
 constructor(private router: Router) {
      
      // Add callback for lock `authenticated` event
      this.lock.on('authenticated', (authResult) => {
        localStorage.setItem('id_token', authResult.idToken);
      });
  }
  
  

  getParameterByName(name) {
    let match = RegExp('[#&]' + name + '=([^&]*)').exec(window.location.hash);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
  }

  getAccessToken() {
    let accessToken = this.getParameterByName('access_token');
    localStorage.setItem('token', accessToken);
  }

  getIdToken() {
    let idToken = this.getParameterByName('id_token');
    localStorage.setItem('id_token', idToken);
    this.decodeIdToken(idToken);
  }

  decodeIdToken(token) {
    let jwtHelper = new JwtHelper();
    let jwt = jwtHelper.decodeToken(token);
    this.verifyNonce(jwt.nonce);
  }

  generateNonce() {
    let existing = localStorage.getItem('nonce');
    if (existing === null) {
      let nonce = '';
      let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      for (let i = 0; i < 16; i++) {
          nonce += possible.charAt(Math.floor(Math.random() * possible.length));
      }
      localStorage.setItem('nonce', nonce);
      return nonce;
    }
    return localStorage.getItem('nonce');
  }

  verifyNonce(nonce) {
    // If nonce does not match we'll log the user out
    if (nonce !== localStorage.getItem('nonce')) {
      localStorage.removeItem('id_token');
      localStorage.removeItem('token');
    }
    this.router.navigateByUrl('/fees');
  }
  
  public login() {
      // Call the show method to display the widget.
      this.lock.show();
    };  

  logout() {
    // To log out, just remove the token and profile
    // from local storage
    localStorage.removeItem('id_token');
    localStorage.removeItem('token');

    // Send the user back to the dashboard after logout
    this.router.navigateByUrl('/fees');
  }

  loggedIn() {
    //return tokenNotExpired();
      return tokenNotExpired('id_token');
  }
  
  public authenticated() {
      // Check if there's an unexpired JWT
      // It searches for an item in localStorage with key == 'id_token'
      return tokenNotExpired('id_token');
    };  
}