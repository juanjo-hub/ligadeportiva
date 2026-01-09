import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [CommonModule],   // ← CLAVE
  templateUrl: './contacto.component.html',
  styleUrl: './contacto.component.css'
})
export class ContactoComponent {

  enviado = false;

  enviarFormulario(event: Event): void {
    event.preventDefault();

    const form = event.target as HTMLFormElement;

    if (!form.checkValidity()) {
      form.classList.add('was-validated');
      this.enviado = false;
      return;
    }

    form.reset();
    form.classList.remove('was-validated');
    this.enviado = true;
  }
}
