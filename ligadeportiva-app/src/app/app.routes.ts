import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';


import { IndexUsuarioComponent } from './components/index-usuario/index-usuario.component';
import { IndexAdmiComponent } from './components/index-admi/index-admi.component';
import { IndexArbitroComponent } from './components/index-arbitro/index-arbitro.component';
import { IndexCapitanComponent } from './components/index-capitan/index-capitan.component';

import { HomeComponent } from './components/home/home.component';
import { ArbitrosComponent } from './components/arbitros/arbitros.component';
import { JugadoresComponent } from './components/jugadores/jugadores.component';
import { ContactoComponent } from './components/contacto/contacto.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },

  // PÁGINAS PÚBLICAS
  { path: 'home', component: HomeComponent },
  { path: 'arbitros', component: ArbitrosComponent },
  { path: 'jugadores', component: JugadoresComponent },
  { path: 'contacto', component: ContactoComponent },

  // AUTENTICACIÓN
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // PANELES PRIVADOS
  { path: 'usuario', component: IndexUsuarioComponent },
  { path: 'admin', component: IndexAdmiComponent },
  { path: 'arbitro', component: IndexArbitroComponent },
  { path: 'capitan', component: IndexCapitanComponent }
];
