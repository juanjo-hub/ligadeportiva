import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { IndexUsuarioComponent } from './components/index-usuario/index-usuario.component';
import { IndexAdmiComponent } from './components/index-admi/index-admi.component';
import { IndexArbitroComponent } from './components/index-arbitro/index-arbitro.component';
import { IndexCapitanComponent } from './components/index-capitan/index-capitan.component';
import { RegisterComponent } from './components/register/register.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'usuario', component: IndexUsuarioComponent },
  { path: 'admin', component: IndexAdmiComponent },
  { path: 'arbitro', component: IndexArbitroComponent },
  { path: 'capitan', component: IndexCapitanComponent }
];
