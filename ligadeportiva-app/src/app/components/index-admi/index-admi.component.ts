import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-index-admi',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './index-admi.component.html'
})
export class IndexAdmiComponent implements OnInit {

  deporte = '';
  equipoLocal = '';
  equipoVisitante = '';
  arbitro = '';
  fecha = '';
  ubicacion = '';
  resultado= '';

  partidos: any[] = [];

  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.cargarPartidos();
    this.cargarRevision(); 
  }

crearPartido() {
  const partido = {
    deporte: this.deporte,
    equipoLocal: this.equipoLocal,
    equipoVisitante: this.equipoVisitante,
    arbitro: this.arbitro,
    fecha: this.fecha,
    ubicacion: this.ubicacion,
    resultado: this.resultado||null
  };

  this.http.post(`${this.apiUrl}/partidos`, partido)
    .subscribe(() => {
      this.limpiarFormulario();
      this.cargarPartidos();
    });
}


  cargarPartidos() {
    this.http.get<any>(`${this.apiUrl}/partidos`)
      .subscribe(res => {
        this.partidos = res.partidos;
      });
  }

guardarCambios(partido: any) {
  const { _id, ...datos } = partido;

  this.http.put(`${this.apiUrl}/partidos/${_id}`, datos)
    .subscribe(() => {
      alert('Partido actualizado correctamente');
    });
}

limpiarFormulario() {
  this.equipoLocal = '';
  this.equipoVisitante = '';
  this.arbitro = '';
  this.fecha = '';
  this.deporte = '';
  this.ubicacion = '';
  this.resultado = '';
}

partidosRevision: any[] = [];

cargarRevision() {
  this.http
    .get<any>(`${this.apiUrl}/partidos/revision`)
    .subscribe(res => {
      this.partidosRevision = res.partidos;
    });
}

marcarRevisado(partido: any) {
  this.http
    .put(`${this.apiUrl}/partidos/${partido._id}/revisado`, {})
    .subscribe(() => {
      this.cargarRevision();
    });
}

}