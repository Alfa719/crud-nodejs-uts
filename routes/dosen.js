const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

const db = mysql.createConnection({
  user: 'root',
  host: 'localhost',  
  database: 'db_crud_nodejs_uts'
});

router.get('/', (req, res) => {
  db.query('SELECT id_dosen, nama, jenis_kelamin, alamat, kota.nama_kota, provinsi.nama_provinsi, telepon, email FROM dosen INNER JOIN kota ON kota.id_kota = dosen.id_kota INNER JOIN provinsi ON provinsi.id_provinsi = kota.id_provinsi', (error, results) => {
    if (error) {
      res.render('dosen', {
        title: 'aplikasi mahasiswa | unuja',
        error
      });
    } else {
      res.render('dosen', {
        title: 'Aplikasi Mahasiswa | UNUJA',
        data: results,   
        activeStateBeranda:'non',
        activeStateMahasiswa: 'non',
        activeStateDosen: 'active',
        activeStateKota: 'non',
        activeStateProvinsi: 'non',
        activeStateMatkul: 'dd',
        activeStateJadwal: 'non',
      });
    }
  });
});
router.post('/search', (req, res) => {
  db.query("SELECT id_dosen, nama, jenis_kelamin, alamat, kota.nama_kota, provinsi.nama_provinsi, telepon, email FROM dosen INNER JOIN kota ON dosen.id_kota = kota.id_kota INNER JOIN provinsi ON kota.id_provinsi = provinsi.id_provinsi WHERE kota.nama_kota LIKE '%"+req.body.search+"%' OR provinsi.nama_provinsi LIKE '%"+req.body.search+"%' ", (error, results) => {
    if (error) {
      res.render('dosen', {
        title: 'aplikasi mahasiswa | unuja',
        error
      });
    } else {
      res.render('dosen', {
        title: 'Aplikasi Mahasiswa | UNUJA',
        data: results,   
        activeStateBeranda:'non',
        activeStateMahasiswa: 'non',
        activeStateDosen: 'active',
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
    res.render('tambah-dosen', {
      title: 'Add Dosen | UNUJA',
      id_kota: results, 
      activeStateBeranda:'n',
      activeStateMahasiswa: 'non',
      activeStateDosen: 'active',
      activeStateKota: 'non',
      activeStateProvinsi: 'non',
      activeStateMatkul: 'dd',
      activeStateJadwal: 'non',
    });
  });
});

router.post('/tambah-dosen', (req, res) => {
  const { nama, jenis_kelamin, alamat, id_kota, telepon, email } = req.body;
  db.query("INSERT INTO dosen VALUES ('', ?, ?, ?, ?, ?, ?)", [nama, jenis_kelamin, alamat, id_kota, telepon, email], (error, result) => {
    if (error) {
      res.render('tambah-dosen', {
        title: 'Aplikasi Mahasiswa | UNUJA',
        error
      });
    } else {
      res.redirect(301, '/dosen/');
    }
  });
});

router.get('/edit/:id_dosen', (req, res) => {
  db.query("SELECT id_dosen, nama, jenis_kelamin, alamat, kota.nama_kota, telepon, email FROM dosen INNER JOIN kota ON dosen.id_kota = kota.id_kota WHERE id_dosen = ?", [req.params.id_dosen], (error, result) => {
    if (error) {
      res.render('edit-dosen', {
        title: 'edit dosen',
        error
      });
    } else {
      db.query('SELECT * FROM kota', (error, kota) => {
        res.render('edit-dosen', {
          title: 'Edit Dosen',
          error: null,
          data: result[0],
          kota,
          activeStateBeranda:'non',
          activeStateMahasiswa: 'non',
          activeStateDosen: 'active',
          activeStateKota: 'non',
          activeStateProvinsi: 'non',
          activeStateMatkul: 'dd',
          activeStateJadwal: 'non',
        });
      });
    }
  });
});

router.post('/update', (req, res) => {
  db.query("UPDATE dosen SET nama = '"+req.body.nama+"', jenis_kelamin = '"+req.body.jenis_kelamin+"', alamat = '"+req.body.alamat+"', id_kota = '"+req.body.id_kota+"', telepon = '"+req.body.telepon+"', email = '"+req.body.email+"' WHERE id_dosen = '"+req.body.id_dosen+"'", (error, result) => {
    if (error) {
      res.redirect('/dosen/edit-dosen/')
    } else {
      res.redirect('/dosen');
    }
  });
});

router.get('/delete/:id_dosen', (req, res) => {
  db.query('DELETE FROM dosen WHERE id_dosen = ?', [req.params.id_dosen], (error, result) => {
    if (error) {
      console.log(error.message);
    } else {
      res.redirect('/dosen');
    }
  });
});

module.exports = router;