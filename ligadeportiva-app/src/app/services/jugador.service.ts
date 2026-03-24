import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Jugador {
  _id?: string;
  name: string;
  nickname: string;
  team: string;
  competition: string;
  competitionLabel: string;
  position: string;
  rol: string;
  esCapitan: boolean;
  number: number;
  group: string;
  stats: { gamesPlayed: number; kda: string };
}

@Injectable({
  providedIn: 'root'
})
export class JugadorService {

  private apiUrl = 'https://ligadeportiva-api.onrender.com/api';

  constructor(private http: HttpClient) {}

  obtenerJugadores(): Observable<Jugador[]> {
    return this.http.get<any>(`${this.apiUrl}/jugadores`).pipe(
      map(res => res.jugadores)
    );
  }

  crearJugador(jugador: Partial<Jugador>): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/jugadores`, jugador);
  }
}