import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-index-arbitro',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './index-arbitro.component.html'
})
export class IndexArbitroComponent implements OnInit {

  partidos: any[] = [];
  arbitro = '';

  apiUrl = 'https://ligadeportiva-api.onrender.com/api';

  constructor(private http: HttpClient) {}

ngOnInit() {
  this.arbitro = localStorage.getItem('usuario') || '';
  console.log('Árbitro logueado:', this.arbitro);
  this.cargarMisPartidos();
}


  cargarMisPartidos() {
    this.http
      .get<any>(`${this.apiUrl}/partidos/arbitro/${this.arbitro}`)
      .subscribe(res => {
        this.partidos = res.partidos;
      });
  }
}
