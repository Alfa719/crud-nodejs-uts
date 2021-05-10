const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

const db = mysql.createConnection({
  user: 'root',
  host: 'localhost',  
  database: 'db_crud_nodejs_uts'
});

router.get('/', (req, res) => {
  db.query('SELECT nim, nama, jenis_kelamin, alamat, kota.nama_kota, provinsi.nama_provinsi, telepon, email FROM mahasiswa INNER JOIN kota ON kota.id_kota = mahasiswa.id_kota INNER JOIN provinsi ON provinsi.id_provinsi = kota.id_provinsi', (error, results) => {
    if (error) {
      res.render('mahasiswa', {
        title: 'aplikasi mahasiswa | unuja',
        error
      });
    } else {
      res.render('mahasiswa', {
        title: 'Aplikasi Mahasiswa | UNUJA',
        data: results,   
        activeStateBeranda:'non',
        activeStateMahasiswa: 'active',
        activeStateDosen: 'non',
        activeStateKota: 'non',
        activeStateProvinsi: 'non',
        activeStateMatkul: 'dd',
        activeStateJadwal: 'non',
      });
    }
  });
});
router.post('/search', (req, res) => {
  db.query("SELECT nim, nama, jenis_kelamin, alamat, kota.nama_kota, provinsi.nama_provinsi, telepon, email FROM mahasiswa INNER JOIN kota ON mahasiswa.id_kota = kota.id_kota INNER JOIN provinsi ON kota.id_provinsi = provinsi.id_provinsi WHERE kota.nama_kota LIKE '%"+req.body.search+"%' OR provinsi.nama_provinsi LIKE '%"+req.body.search+"%' ", (error, results) => {
    if (error) {
      res.render('mahasiswa', {
        title: 'aplikasi mahasiswa | unuja',
        error
      });
    } else {
      res.render('mahasiswa', {
        title: 'Aplikasi Mahasiswa | UNUJA',
        data: results,   
        activeStateBeranda:'non',
        activeStateMahasiswa: 'active',
        activeStateDosen: 'non',
        activeStateKota: 'non',
        activeStateProvinsi: 'non',
        activeStateMatkul: 'dd',
        activeStateJadwal: 'non',
      });
    }
  });
});

router.get('/tambah', (req, res) => {
  db.query('SELECT * FROM kota', (error, results) => {
    res.render('tambah-mahasiswa', {
      title: 'Add Mahasiswa | UNUJA',
      id_kota: results, 
      activeStateBeranda:'n',
      activeStateMahasiswa: 'active',
      activeStateDosen: 'c',
      activeStateKota: 'non',
      activeStateProvinsi: 'non',
      activeStateMatkul: 'dd',
      activeStateJadwal: 'non',
    });
  });
});

router.post('/tambah-mahasiswa', (req, res) => {
  const { nim, nama, jenis_kelamin, alamat, id_kota, telepon, email } = req.body;
  db.query('INSERT INTO mahasiswa VALUES (?,?, ?, ?, ?, ?, ?)', [nim, nama, jenis_kelamin, alamat, id_kota, telepon, email], (error, result) => {
    if (error) {
      res.render('tambah-mahasiswa', {
        title: 'Aplikasi Mahasiswa | UNUJA',
        error
      });
    } else {
      res.redirect(301, '/mahasiswa/');
    }
  });
});

router.get('/edit/:nim', (req, res) => {
  db.query("SELECT nim, nama, jenis_kelamin, alamat, kota.nama_kota, telepon, email FROM mahasiswa INNER JOIN kota ON mahasiswa.id_kota = kota.id_kota WHERE nim = ?", [req.params.nim], (error, result) => {
    if (error) {
      res.render('edit-mahasiswa', {
        title: 'edit dosen',
        error
      });
    } else {
      db.query('SELECT * FROM kota', (error, kota) => {
        res.render('edit-mahasiswa', {
          title: 'Edit Mahasiswa',
          error: null,
          data: result[0],
          kota,
          activeStateBeranda:'non',
          activeStateMahasiswa: 'active',
          activeStateDosen: 'non',
          activeStateKota: 'non',
          activeStateProvinsi: 'non',
          activeStateMatkul: 'dd',
          activeStateJadwal: 'non',
        });
      });
    }
  });
});

router.post('/update-mahasiswa', (req, res) => {
  const {nama, jenis_kelamin, alamat, id_kota, telepon, email, nim} = req.body;
  db.query("UPDATE mahasiswa SET nama = ?, jenis_kelamin = ?, alamat = ?, id_kota = ?, telepon = ?, email = ? WHERE nim = ?", [nama, jenis_kelamin, alamat, id_kota, telepon, email, nim], (error, result) => {
    if (error) {
      res.redirect('/mahasiswa/edit-mahasiswa/')
    } else {
      res.redirect('/mahasiswa');
    }
  });
});

router.get('/delete/:nim', (req, res) => {
  db.query('DELETE FROM mahasiswa WHERE nim = ?', [req.params.nim], (error, result) => {
    if (error) {
      console.log(error.message);
    } else {
      res.redirect('/mahasiswa');
    }
  });
});

module.exports = router;