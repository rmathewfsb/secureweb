import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AUTH_PROVIDERS } from 'angular2-jwt';

import { AppComponent } from './app.component';
import { routing, routedComponents } from './app.routing';
import { CallbackComponent } from './callback.component';
import { FeeService } from './fee.service';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    CallbackComponent,
    routedComponents
  ],
  imports: [
    BrowserModule,
    FormsModule,
    routing,    
    HttpModule
  ],
  providers: [
              FeeService,
              AUTH_PROVIDERS,
              AuthService,
              AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
