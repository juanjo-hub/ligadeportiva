import { AfterViewInit, Component } from '@angular/core';

declare const bootstrap: any;

@Component({
  selector: 'app-jugadores',
  standalone: true,
  imports: [],
  templateUrl: './jugadores.component.html'
})
export class JugadoresComponent implements AfterViewInit {

  playersData = [
    {
      id: 'p-ana-lopez',
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
      id: 'p-luis-ortega',
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

  statsConfig: any = {
    esports: {
      title: 'Estadísticas en Esports',
      columns: [
        { key: 'gamesPlayed', label: 'Partidos' },
        { key: 'kda', label: 'KDA' }
      ]
    }
  };

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

    pintar();
  }

  abrirModal(jugador: any) {
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
