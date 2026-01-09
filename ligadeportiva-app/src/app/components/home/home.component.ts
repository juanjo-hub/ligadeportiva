import { AfterViewInit, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

declare const bootstrap: any;

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule],   // ← CLAVE
  templateUrl: './home.component.html'
})
export class HomeComponent implements AfterViewInit {

  ngAfterViewInit(): void {

    const carrusel = document.getElementById('carruselNoticias');
    const contador = document.getElementById('contadorNoticias');

    if (carrusel && contador) {
      const total = carrusel.querySelectorAll('.carousel-item').length;

      const actualizar = () => {
        const activo = carrusel.querySelector('.carousel-item.active');
        if (!activo) return;

        const indice = Array.from(activo.parentElement!.children)
          .indexOf(activo) + 1;

        contador.textContent = `${indice} / ${total}`;
      };

      carrusel.addEventListener('slid.bs.carousel', actualizar);
      actualizar();
    }
  }
}
