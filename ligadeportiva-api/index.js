const express = require('express');
const cors = require('cors');
const { connectDB } = require('./db');
const { ObjectId } = require('mongodb');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Servidor backend escuchando en http://localhost:${PORT}`);
});

/* ================= LOGIN ================= */
app.get('/api/login', async (req, res) => {
  try {
    const { usuario, password } = req.query;

    if (!usuario || !password) {
      return res.status(400).json({
        ok: false,
        error: 'Faltan credenciales'
      });
    }

    const database = await connectDB();
    const usuarios = database.collection('usuarios');

    const user = await usuarios.findOne({ usuario, password });

    if (!user) {
      return res.status(401).json({
        ok: false,
        error: 'Usuario o contraseña incorrectos'
      });
    }

    //  CLAVE ABSOLUTA
    res.json({
      ok: true,
      usuario: user.usuario,
      tipo: user.tipo,
      equipo: user.equipo || null
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      error: 'Error del servidor'
    });
  }
});

/* ================= REGISTER ================= */
app.post('/api/register', async (req, res) => {
  try {
    const { usuario, password, tipo, equipo } = req.body;

    if (!usuario || !password || !tipo) {
      return res.status(400).json({
        ok: false,
        error: 'Datos incompletos'
      });
    }

    if ((tipo === 'usuario' || tipo === 'capitan') && !equipo) {
      return res.status(400).json({
        ok: false,
        error: 'El equipo es obligatorio para este tipo de usuario'
      });
    }

    const database = await connectDB();
    const usuarios = database.collection('usuarios');

    const existe = await usuarios.findOne({ usuario });
    if (existe) {
      return res.status(409).json({
        ok: false,
        error: 'El usuario ya existe'
      });
    }

    const nuevoUsuario = {
      usuario,
      password,
      tipo,
      ...(equipo && { equipo })
    };

    await usuarios.insertOne(nuevoUsuario);

    res.json({
      ok: true,
      message: 'Usuario registrado correctamente'
    });

  } catch (error) {
    res.status(500).json({
      ok: false,
      error: 'Error del servidor'
    });
  }
});

/* ================= PARTIDOS ================= */
app.post('/api/partidos', async (req, res) => {
  try {
    const {
      deporte,
      equipoLocal,
      equipoVisitante,
      fecha,
      arbitro,
      ubicacion,
      resultado
    } = req.body;

    if (!deporte || !equipoLocal || !equipoVisitante || !fecha || !arbitro || !ubicacion) {
      return res.status(400).json({
        ok: false,
        error: 'Datos incompletos'
      });
    }

    const database = await connectDB();
    const partidos = database.collection('partidos');

    await partidos.insertOne({
      deporte,
      equipoLocal,
      equipoVisitante,
      fecha,
      arbitro,
      ubicacion,
      resultado: resultado ?? null
    });

    res.json({
      ok: true,
      message: 'Partido creado correctamente'
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      error: 'Error del servidor'
    });
  }
});

/* ================= LISTAR ================= */
app.get('/api/partidos', async (req, res) => {
  try {
    const database = await connectDB();
    const partidos = database.collection('partidos');

    const lista = await partidos.find().toArray();

    res.json({
      ok: true,
      partidos: lista
    });

  } catch (error) {
    res.status(500).json({
      ok: false,
      error: 'Error al obtener los partidos'
    });
  }
});

/* ================= ÁRBITRO ================= */
app.get('/api/partidos/arbitro/:nombre', async (req, res) => {
  try {
    const { nombre } = req.params;

    const database = await connectDB();
    const partidos = database.collection('partidos');

    const lista = await partidos.find({ arbitro: nombre }).toArray();

    res.json({
      ok: true,
      partidos: lista
    });

  } catch (error) {
    res.status(500).json({
      ok: false,
      error: 'Error al obtener partidos del árbitro'
    });
  }
});

/* ================= USUARIO (EQUIPO) ================= */
app.get('/api/partidos/equipo/:equipo', async (req, res) => {
  try {
    const { equipo } = req.params;

    const database = await connectDB();
    const partidos = database.collection('partidos');

    const lista = await partidos.find({
      $or: [
        { equipoLocal: equipo },
        { equipoVisitante: equipo }
      ]
    }).toArray();

    res.json({
      ok: true,
      partidos: lista
    });

  } catch (error) {
    res.status(500).json({
      ok: false,
      error: 'Error al obtener partidos del equipo'
    });
  }
});

/* CAPITÁN */
app.put('/api/partidos/:id/resultado-capitan', async (req, res) => {
  try {
    const { id } = req.params;
    const { equipo, resultado } = req.body;

    const db = await connectDB();
    const partidos = db.collection('partidos');

    const partido = await partidos.findOne({ _id: new ObjectId(id) });
    if (!partido) {
      return res.status(404).json({ ok: false, error: 'Partido no encontrado' });
    }

    // ❌ No permitir antes de la fecha
    const hoy = new Date().toISOString().split('T')[0];
    if (partido.fecha > hoy) {
      return res.status(400).json({
        ok: false,
        error: 'No se puede introducir resultado antes del partido'
      });
    }

    const update = {};

    if (partido.equipoLocal === equipo) {
      update.resultadoLocal = resultado;
    } else if (partido.equipoVisitante === equipo) {
      update.resultadoVisitante = resultado;
    } else {
      return res.status(403).json({
        ok: false,
        error: 'No perteneces a este partido'
      });
    }

    await partidos.updateOne(
      { _id: new ObjectId(id) },
      { $set: update }
    );

    // 🔍 Comprobación de coincidencia
    const actualizado = await partidos.findOne({ _id: new ObjectId(id) });

    if (
      actualizado.resultadoLocal &&
      actualizado.resultadoVisitante
    ) {
      if (actualizado.resultadoLocal === actualizado.resultadoVisitante) {
        await partidos.updateOne(
          { _id: new ObjectId(id) },
          {
            $set: {
              resultadoFinal: actualizado.resultadoLocal,
              estado: 'confirmado'
            }
          }
        );
      } else {
        await partidos.updateOne(
          { _id: new ObjectId(id) },
          { $set: { estado: 'revision_admin' } }
        );
      }
    }

    res.json({ ok: true, message: 'Resultado enviado' });

  } catch (err) {
    res.status(500).json({ ok: false, error: 'Error del servidor' });
  }
});

/*REVISIÓN RESULTADOS: ADMIN*/
app.get('/api/partidos/revision', async (req, res) => {
  try {
    const db = await connectDB();
    const partidos = db.collection('partidos');

    const lista = await partidos
      .find({ estado: 'revision_admin' })
      .toArray();

    res.json({
      ok: true,
      partidos: lista
    });

  } catch (err) {
    res.status(500).json({ ok: false });
  }
});


app.put('/api/partidos/:id/revisado', async (req, res) => {
  try {
    const { id } = req.params;

    const db = await connectDB();
    const partidos = db.collection('partidos');

    await partidos.updateOne(
      { _id: new ObjectId(id) },
      { $set: { estado: 'revisado' } }
    );

    res.json({ ok: true });

  } catch (err) {
    res.status(500).json({ ok: false });
  }
});

/* ================= JUGADORES ================= */

// Listar todos los jugadores
app.get('/api/jugadores', async (req, res) => {
  try {
    const database = await connectDB();
    const jugadores = database.collection('jugadores');

    const lista = await jugadores.find().toArray();

    res.json({ ok: true, jugadores: lista });
  } catch (error) {
    res.status(500).json({ ok: false, error: 'Error al obtener jugadores' });
  }
});

// Crear un jugador
app.post('/api/jugadores', async (req, res) => {
  try {
    const { name, nickname, team, competition, competitionLabel, position, rol, esCapitan, number, group, stats } = req.body;

    if (!name || !team || !position) {
      return res.status(400).json({ ok: false, error: 'Datos incompletos' });
    }

    const database = await connectDB();
    const jugadores = database.collection('jugadores');

    await jugadores.insertOne({
      name, nickname, team, competition, competitionLabel,
      position, rol, esCapitan, number, group, stats
    });

    res.json({ ok: true, message: 'Jugador creado correctamente' });
  } catch (error) {
    res.status(500).json({ ok: false, error: 'Error del servidor' });
  }
});