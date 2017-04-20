import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'fees-list',
  providers: [ AuthService ],
  templateUrl: '../index.html',
  template: `
  <div class="container">
      A secure app using angular2
          <nav class="navbar navbar-default">
        <div class="navbar-header">
          <a class="navbar-brand" routerLink="/dashboard"></a>
        </div>
        <!-- On the left side of our navbar we'll display the two links for public and private fees -->
        <ul class="nav navbar-nav">
          <li>
            <a routerLink="/fees" routerLinkActive="active">Fees</a>
          </li>
          <li>
            <a routerLink="/secure" *ngIf="authService.authenticated()" routerLinkActive="active">Secure Fees</a>
          </li>
        </ul>
        <!-- On the right side of our navbar we'll display the login and logout actions depending on user state -->
        <ul class="nav navbar-nav navbar-right">
          <li>
      <button class="btn btn-primary btn-margin" (click)="authService.login()" *ngIf="!authService.authenticated()">Log In</button>
      <button class="btn btn-primary btn-margin" (click)="authService.logout()" *ngIf="authService.authenticated()">Log Out</button>
          </li>
        </ul>          
          </nav>
     <div class="col-sm-12">
      <!-- The router-outlet directive will display the component based on the route we are on, more on this soon -->
      <router-outlet></router-outlet>
    </div>
  </div>
  `,
  
  styles : ['.navbar-right { margin-right: 0px !important}']
})
export class AppComponent {
    title = 'List of Fees';
    nonce: string;

    constructor(private authService: AuthService) {
      this.nonce = this.authService.generateNonce();
    }
}

