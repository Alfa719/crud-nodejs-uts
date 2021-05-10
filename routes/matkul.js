const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

const db = mysql.createConnection({
  user: 'root',
  host: 'localhost',
  database: 'db_crud_nodejs_uts'
});

router.get('/', (req, res) => {
  db.query('SELECT * FROM matkul', (error, result) => {
    if (error) {
      res.render('matkul', {
        title: 'halaman prodi',
        error: error
      });
    } 
    
    res.render('matkul', {
      title: 'Aplikasi Mahasiswa | UNUJA',
        data: result,
        activeStateBeranda:'non',
        activeStateMahasiswa: 'non',
        activeStateDosen: 'non',
        activeStateKota: 'non',
        activeStateProvinsi: 'non',
        activeStateMatkul: 'active',
        activeStateJadwal: 'non',
    });
    
  })
});

router.post('/tambah', (req, res) => {
  const { matkul, semester, sks } = req.body;
  const id_matkul = 'MKL' + Date.now();
  db.query("INSERT INTO matkul VALUES (?, ?, ?, ?)", [id_matkul, matkul, semester, sks], (error, result) => {
    if (error) {
      res.render('matkul', {
        title: 'Aplikasi Mahasiswa | UNUJA',
        error,
      });
    } else {
      res.redirect(301, '/matkul');
    }
  });
})
router.get('/delete/:id', (req, res) => {
  db.query('DELETE FROM matkul WHERE id_matkul = ?', [req.params.id], (error, result) => {
    if (error) {
      console.log(error.message);
    } else {
      res.redirect('/matkul');
    }
  });
});
module.exports = router;