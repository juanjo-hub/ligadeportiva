import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {

  usuario = '';
  password = '';
  error = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

login() {
  this.authService.login(this.usuario, this.password)
    .subscribe(res => {
      if (res.ok) {

        localStorage.setItem('usuario', JSON.stringify({
          usuario: res.usuario,
          tipo: res.tipo,
          equipo: res.equipo   
        }));

        this.router.navigate(['/' + res.tipo]);
      } else {
        this.error = res.error;
      }
    });
}


}
