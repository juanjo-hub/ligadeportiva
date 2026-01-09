import { AfterViewInit, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

declare const bootstrap: any;

@Component({
  selector: 'app-arbitros',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './arbitros.component.html'
})
export class ArbitrosComponent implements AfterViewInit {

  private datosArbitros = [
    {
      id: 'r-marta-ruiz',
      nombre: 'Marta Ruiz',
      licencia: 'CR-101',
      competicion: 'baloncesto',
      etiquetaCompeticion: 'Baloncesto',
      nivel: 'Federada autonómica',
      aniosExperiencia: 4,
      grupo: 'Profesorado / Dept. EF',
      contacto: 'marta.ruiz@instituto.ejemplo'
    },
    {
      id: 'r-diego-martin',
      nombre: 'Diego Martín',
      licencia: 'CR-102',
      competicion: 'esports',
      etiquetaCompeticion: 'Esports',
      nivel: 'Árbitro de liga interna',
      aniosExperiencia: 2,
      grupo: '2º Bachillerato A',
      contacto: 'diego.martin@instituto.ejemplo'
    },
    {
      id: 'r-laura-gil',
      nombre: 'Laura Gil',
      licencia: 'CR-103',
      competicion: 'balonmano',
      etiquetaCompeticion: 'Balonmano',
      nivel: 'Federada provincial',
      aniosExperiencia: 6,
      grupo: '1º Bachillerato C',
      contacto: 'laura.gil@instituto.ejemplo'
    },
    {
      id: 'r-javier-ramos',
      nombre: 'Javier Ramos',
      licencia: 'CR-104',
      competicion: 'baloncesto',
      etiquetaCompeticion: 'Baloncesto',
      nivel: 'Ayudante / mesa',
      aniosExperiencia: 1,
      grupo: '4º ESO B',
      contacto: 'javier.ramos@instituto.ejemplo'
    }
  ];

  ngAfterViewInit(): void {

    const selectCompeticion = document.getElementById('competitionFilter') as HTMLSelectElement;
    const inputBusqueda = document.getElementById('refereeSearch') as HTMLInputElement;
    const selectExperiencia = document.getElementById('experienceFilter') as HTMLSelectElement;
    const lista = document.getElementById('refereesList')!;
    const contador = document.getElementById('refereesCount')!;

    const pintar = () => {
      lista.innerHTML = '';
      let total = 0;

      this.datosArbitros.forEach(arbitro => {

        if (selectCompeticion.value !== 'all' &&
            arbitro.competicion !== selectCompeticion.value) return;

        if (inputBusqueda.value &&
            !(arbitro.nombre + arbitro.licencia)
              .toLowerCase()
              .includes(inputBusqueda.value.toLowerCase())) return;

        if (selectExperiencia.value === '1' && arbitro.aniosExperiencia !== 1) return;
        if (selectExperiencia.value === '2' && arbitro.aniosExperiencia !== 2) return;
        if (selectExperiencia.value === '3plus' && arbitro.aniosExperiencia < 3) return;

        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';

        li.innerHTML = `
          <div>
            <strong>${arbitro.nombre}</strong>
            <span class="text-muted small">(${arbitro.licencia})</span><br>
            <span class="small text-muted">${arbitro.nivel}</span>
          </div>
          <button class="btn btn-sm btn-outline-primary">Ver ficha</button>
        `;

        li.querySelector('button')!.addEventListener('click', () => this.mostrarFicha(arbitro));
        lista.appendChild(li);
        total++;
      });

      contador.textContent = `Mostrando ${total} árbitro${total !== 1 ? 's' : ''}`;
    };

    selectCompeticion.onchange = pintar;
    inputBusqueda.oninput = pintar;
    selectExperiencia.onchange = pintar;

    pintar();
  }

  mostrarFicha(arbitro: any) {
    (document.getElementById('refereeModalLabel')!).textContent = arbitro.nombre;
    (document.getElementById('refereeModalSubtitle')!).textContent =
      `${arbitro.etiquetaCompeticion} · ${arbitro.nivel}`;

    (document.getElementById('refereeNameDetail')!).textContent = arbitro.nombre;
    (document.getElementById('refereeLicenseDetail')!).textContent = arbitro.licencia;
    (document.getElementById('refereeCompetitionBadge')!).textContent = arbitro.etiquetaCompeticion;
    (document.getElementById('refereeLevelDetail')!).textContent = arbitro.nivel;
    (document.getElementById('refereeExperienceDetail')!).textContent =
      arbitro.aniosExperiencia + ' años';
    (document.getElementById('refereeGroupDetail')!).textContent = arbitro.grupo;
    (document.getElementById('refereeContactDetail')!).textContent = arbitro.contacto;

    new bootstrap.Modal(document.getElementById('refereeModal')).show();
  }
}
