describe('Página de Jugadores', () => {

  const mockJugadores = {
    ok: true,
    jugadores: [
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
    ]
  };

  beforeEach(() => {
    cy.intercept('GET', '**/api/jugadores', mockJugadores).as('getJugadores');
  });

  // CASO EXITOSO: ver lista
  it('debe mostrar la lista de jugadores', () => {
    cy.visit('http://localhost:4200/jugadores');
    cy.wait('@getJugadores');

    cy.get('#playersList li').should('have.length', 2);
    cy.get('#playersList').should('contain', 'Ana López');
    cy.get('#playersList').should('contain', 'Luis Ortega');
  });

  // CASO EXITOSO: filtrar por nombre
  it('debe filtrar jugadores por búsqueda', () => {
    cy.visit('http://localhost:4200/jugadores');
    cy.wait('@getJugadores');

    cy.get('#playerSearch').type('Ana');

    cy.get('#playersList li').should('have.length', 1);
    cy.get('#playersList').should('contain', 'Ana López');
  });

  // CASO EXITOSO: filtrar por posición
  it('debe filtrar por posición defensa', () => {
    cy.visit('http://localhost:4200/jugadores');
    cy.wait('@getJugadores');

    cy.get('#positionFilter').select('defensa');

    cy.get('#playersList li').should('have.length', 1);
    cy.get('#playersList').should('contain', 'Luis Ortega');
  });

  // CASO DE ERROR CONTROLADO
  it('debe mostrar error si la API falla', () => {
    cy.intercept('GET', '**/api/jugadores', {
      statusCode: 500,
      body: { error: 'Error del servidor' }
    }).as('getJugadoresError');

    cy.visit('http://localhost:4200/jugadores');
    cy.wait('@getJugadoresError');

    cy.get('#playersCount').should('contain', 'Error al cargar los jugadores');
  });
});