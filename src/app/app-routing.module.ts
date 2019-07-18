import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { VerifyEmailComponent } from './pages/verify-email/verify-email.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { AuthGuard } from './core/guards';


const routes: Routes = [
  { path: 'login',  component: LoginComponent},
  { path: '',   redirectTo: '/login', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent},
  { path: 'verify/:id/:token', component: VerifyEmailComponent},
  { path: 'reset/:id/:token', component: ResetPasswordComponent},
  { path: 'dashboard', loadChildren:
   () => import('@/feature/customer-dashboard/customer-dashboard.module').then(mod => mod.CustomerDashboardModule),
  canActivate: [AuthGuard] },
  { path: '**',  component: PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
