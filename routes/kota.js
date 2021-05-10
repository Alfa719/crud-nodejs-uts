const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

const db = mysql.createConnection({
  user: 'root',
  host: 'localhost',
  database: 'db_crud_nodejs_uts'
});

router.get('/', (req, res) => {
  db.query('SELECT * FROM kota INNER JOIN provinsi ON kota.id_provinsi = provinsi.id_provinsi', (error, result) => {
    if (error) {
      res.render('kota', {
        title: 'Error',
        error: error
      });
    } else {
      db.query('SELECT * FROM provinsi', (error, provinsi) => {
        res.render('kota', {
          title: 'Aplikasi Mahasiswa | UNUJA',
          error: null,
          data: result,
          provinsi,
          activeStateBeranda:'non',
          activeStateMahasiswa: 'non',
          activeStateDosen: 'non',
          activeStateKota: 'active',
          activeStateProvinsi: 'non',
          activeStateMatkul: 'non',
          activeStateJadwal: 'non',
        });
      });
    }
  })
});

router.post('/tambah', (req, res) => {
  const {id_provinsi, nama_kota} = req.body;
  db.query("INSERT INTO kota VALUES ('', ?, ? )", [id_provinsi, nama_kota], (error, result) => {
    if (error) {
      res.render('kota', {
        title: 'Aplikasi Mahasiswa | UNUJA',
        error,
      });
    } else {
      res.redirect(301, '/kota');
    }
  });
})
router.get('/delete/:id', (req, res) => {
  db.query('DELETE FROM kota WHERE id_kota = ?', [req.params.id], (error, result) => {
    if (error) {
      console.log(error.message);
    } else {
      res.redirect('/kota');
    }
  });
});
module.exports = router;