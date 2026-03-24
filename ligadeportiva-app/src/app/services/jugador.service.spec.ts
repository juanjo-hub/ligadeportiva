import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { JugadorService, Jugador } from './jugador.service';

describe('JugadorService', () => {
  let service: JugadorService;
  let httpMock: HttpTestingController;

  // Datos mock: simulamos lo que devolvería la API
  const mockJugadores: Jugador[] = [
    {
      name: 'Ana López',
      nickname: 'Anix',
      team: 'Fénix eSports',
      competition: 'esports',
      competitionLabel: 'Esports',
      position: 'Capitana',
      rol: 'ataque',
      esCapitan: true,
      number: 7,
      group: '2º Bachillerato B',
      stats: { gamesPlayed: 8, kda: '1.8' }
    },
    {
      name: 'Luis Ortega',
      nickname: 'Shield',
      team: 'Fénix eSports',
      competition: 'esports',
      competitionLabel: 'Esports',
      position: 'Support',
      rol: 'defensa',
      esCapitan: false,
      number: 9,
      group: '1º Bachillerato C',
      stats: { gamesPlayed: 8, kda: '1.2' }
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [JugadorService]
    });
    service = TestBed.inject(JugadorService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('debe crearse el servicio', () => {
    expect(service).toBeTruthy();
  });

  it('debe obtener la lista de jugadores', () => {
    service.obtenerJugadores().subscribe(jugadores => {
      expect(jugadores.length).toBe(2);
      expect(jugadores[0].name).toBe('Ana López');
      expect(jugadores[1].nickname).toBe('Shield');
    });

    const req = httpMock.expectOne(
      'https://ligadeportiva-api.onrender.com/api/jugadores'
    );
    expect(req.request.method).toBe('GET');
    // Devolvemos la respuesta falsa con el mismo formato que tu API
    req.flush({ ok: true, jugadores: mockJugadores });
  });

  it('debe crear un jugador nuevo', () => {
    const nuevo = { name: 'Carlos Ruiz', team: 'Dragones', position: 'Jungler' };

    service.crearJugador(nuevo).subscribe(res => {
      expect(res.ok).toBeTrue();
    });

    const req = httpMock.expectOne(
      'https://ligadeportiva-api.onrender.com/api/jugadores'
    );
    expect(req.request.method).toBe('POST');
    expect(req.request.body.name).toBe('Carlos Ruiz');
    req.flush({ ok: true, message: 'Jugador creado correctamente' });
  });

  it('debe manejar error del servidor', () => {
    service.obtenerJugadores().subscribe({
      next: () => fail('debería haber fallado'),
      error: (error) => {
        expect(error.status).toBe(500);
      }
    });

    const req = httpMock.expectOne(
      'https://ligadeportiva-api.onrender.com/api/jugadores'
    );
    req.flush('Error', { status: 500, statusText: 'Internal Server Error' });
  });
});