import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html'
})
export class RegisterComponent {

  usuario = '';
  password = '';
  tipo = '';
  equipo = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  register() {
    // Validación lógica
    if ((this.tipo === 'usuario' || this.tipo === 'capitan') && !this.equipo) {
      alert('Debes indicar un equipo');
      return;
    }

    this.authService.register(
      this.usuario,
      this.password,
      this.tipo,
      this.equipo
    ).subscribe(() => {
      alert('Usuario registrado correctamente');
      this.router.navigate(['/login']);
    });
  }
}
