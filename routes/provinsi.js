const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

const db = mysql.createConnection({
  user: 'root',
  host: 'localhost',
  database: 'db_crud_nodejs_uts'
});

router.get('/', (req, res) => {
  db.query('SELECT * FROM provinsi', (error, result) => {
    if (error) {
      res.render('provinsi', {
        title: 'Error',
        error: error
      });
    } 
    res.render('provinsi', {
      title: 'Aplikasi Mahasiswa | UNUJA',
        data: result,
        activeStateBeranda:'non',
        activeStateMahasiswa: 'non',
        activeStateDosen: 'non',
        activeStateKota: 'non',
        activeStateProvinsi: 'active',
        activeStateMatkul: 'non',
        activeStateJadwal: 'non',
    });
    
  })
});

router.post('/tambah', (req, res) => {
  const nama_provinsi = req.body.nama_provinsi;
  db.query("INSERT INTO provinsi VALUES ('', ? )", [nama_provinsi], (error, result) => {
    if (error) {
      res.render('provinsi', {
        title: 'Aplikasi Mahasiswa | UNUJA',
        error,
      });
    } else {
      res.redirect(301, '/provinsi');
    }
  });
})
router.get('/delete/:id', (req, res) => {
  db.query('DELETE FROM provinsi WHERE id_provinsi = ?', [req.params.id], (error, result) => {
    if (error) {
      console.log(error.message);
    } else {
      res.redirect('/provinsi');
    }
  });
});
module.exports = router;