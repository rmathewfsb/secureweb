import { Routes, RouterModule, CanActivate} from '@angular/router';
import { AuthGuard } from './auth-guard.service';
// Import our components
import { AppComponent } from './app.component';
import { PublicFeesComponent } from './public-fees.component';
import { PrivateFeesComponent } from './private-fees.component';
import { CallbackComponent } from './callback.component';

const appRoutes: Routes = [
  // Add the redirect
  {
    path: '',
    redirectTo: '/fees',
    pathMatch: 'full'
  },
  // Add our routes
  {
    path: 'fees',
    component: PublicFeesComponent
  },
  {
    path: 'secure',
    component: PrivateFeesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'callback',
    component: CallbackComponent,
  }
];
// Here we are exporting our routes
export const routing = RouterModule.forRoot(appRoutes);
// Here we are combining our routing components into a single array. 
//We will use this a little later when we update our root module
export const routedComponents = [PublicFeesComponent, PrivateFeesComponent, CallbackComponent];