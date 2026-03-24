import { AfterViewInit, Component } from '@angular/core';
import { JugadorService, Jugador } from '../../services/jugador.service';

declare const bootstrap: any;

@Component({
  selector: 'app-jugadores',
  standalone: true,
  imports: [],
  templateUrl: './jugadores.component.html'
})
export class JugadoresComponent implements AfterViewInit {

  // ANTES: aquí tenías el array playersData con los datos a mano
  // AHORA: empieza vacío y se llena desde la API
  playersData: Jugador[] = [];

  statsConfig: any = {
    esports: {
      title: 'Estadísticas en Esports',
      columns: [
        { key: 'gamesPlayed', label: 'Partidos' },
        { key: 'kda', label: 'KDA' }
      ]
    }
  };

  // NUEVO: inyectamos el servicio
  constructor(private jugadorService: JugadorService) {}

  ngAfterViewInit(): void {

    const competitionFilter = document.getElementById('competitionFilter') as HTMLSelectElement;
    const positionFilter = document.getElementById('positionFilter') as HTMLSelectElement;
    const playerSearch = document.getElementById('playerSearch') as HTMLInputElement;
    const playersList = document.getElementById('playersList')!;
    const playersCount = document.getElementById('playersCount')!;

    const pintar = () => {
      playersList.innerHTML = '';

      const filtrados = this.playersData.filter(p => {
        if (competitionFilter.value !== 'all' && p.competition !== competitionFilter.value) return false;
        if (positionFilter.value === 'defensa' && p.rol !== 'defensa') return false;
        if (positionFilter.value === 'ataque' && p.rol !== 'ataque') return false;
        if (positionFilter.value === 'capitan' && !p.esCapitan) return false;
        if (playerSearch.value &&
            !(p.name + p.team).toLowerCase().includes(playerSearch.value.toLowerCase())) return false;
        return true;
      });

      filtrados.forEach(jugador => {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between';

        li.innerHTML = `
          <div>
            <strong>${jugador.name}</strong>
            <span class="text-muted small">(${jugador.nickname})</span><br>
            <span class="small text-muted">${jugador.team}</span>
          </div>
          <button class="btn btn-sm btn-outline-primary">Ver ficha</button>
        `;

        li.querySelector('button')!
          .addEventListener('click', () => this.abrirModal(jugador));

        playersList.appendChild(li);
      });

      playersCount.textContent =
        `Mostrando ${filtrados.length} jugador${filtrados.length !== 1 ? 'es' : ''}`;
    };

    competitionFilter.onchange = pintar;
    positionFilter.onchange = pintar;
    playerSearch.oninput = pintar;

    // ANTES: pintar() directamente con datos hardcodeados
    // AHORA: cargamos desde la API y luego pintamos
    this.jugadorService.obtenerJugadores().subscribe({
      next: (data) => {
        this.playersData = data;
        pintar();
      },
      error: (err) => {
        console.error('Error al cargar jugadores', err);
        playersCount.textContent = 'Error al cargar los jugadores';
      }
    });
  }

  abrirModal(jugador: any) {
    // Este método queda exactamente igual que antes
    (document.getElementById('playerModalLabel')!).textContent = jugador.name;
    (document.getElementById('playerModalSubtitle')!).textContent =
      `${jugador.team} · ${jugador.competitionLabel}`;

    (document.getElementById('playerNameDetail')!).textContent = jugador.name;
    (document.getElementById('playerTeamDetail')!).textContent = jugador.team;
    (document.getElementById('playerCompetitionBadge')!).textContent = jugador.competitionLabel;
    (document.getElementById('playerPositionDetail')!).textContent = jugador.position;
    (document.getElementById('playerNumberDetail')!).textContent = jugador.number;
    (document.getElementById('playerGroupDetail')!).textContent = jugador.group;

    const config = this.statsConfig[jugador.competition];
    (document.getElementById('playerStatsTitle')!).textContent = config.title;

    const head = document.getElementById('playerStatsHead')!;
    const row = document.getElementById('playerStatsRow')!;
    head.innerHTML = '';
    row.innerHTML = '';

    config.columns.forEach((c: any) => {
      head.innerHTML += `<th>${c.label}</th>`;
      row.innerHTML += `<td>${jugador.stats[c.key] ?? '-'}</td>`;
    });

    new bootstrap.Modal(document.getElementById('playerModal')).show();
  }
}