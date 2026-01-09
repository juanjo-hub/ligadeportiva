import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-index-capitan',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './index-capitan.component.html'
})
export class IndexCapitanComponent implements OnInit {

  partidos: any[] = [];
  equipo = '';
  apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

ngOnInit() {
  const userStr = localStorage.getItem('usuario');

  if (!userStr) {
    return;
  }

  const user = JSON.parse(userStr);

  if (!user.equipo) {
    console.error('Usuario sin equipo');
    return;
  }

  this.equipo = user.equipo;

  const equipoEncoded = encodeURIComponent(this.equipo);

  this.http
    .get<any>(`${this.apiUrl}/partidos/equipo/${equipoEncoded}`)
    .subscribe(res => {
      this.partidos = res.partidos;
    });
}
enviarResultado(partido: any) {
  if (!partido.miResultado || partido.miResultado.trim() === '') {
    alert('Debes introducir un resultado');
    return;
  }

  this.http.put(`${this.apiUrl}/partidos/${partido._id}/resultado-capitan`, {
    equipo: this.equipo,
    resultado: partido.miResultado
  }).subscribe({
    next: () => {
      alert('Resultado enviado correctamente');
      partido.miResultado = '';
    },
    error: (err) => {
      alert(err.error?.error || 'Error al enviar resultado');
    }
  });
}


}
