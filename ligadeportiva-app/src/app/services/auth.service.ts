import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  login(usuario: string, password: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/login`, {
      params: { usuario, password }
    });
  }

register(usuario: string, password: string, tipo: string, equipo?: string) {
  return this.http.post<any>(`${this.apiUrl}/register`, {
    usuario,
    password,
    tipo,
    equipo
  });
}

}
