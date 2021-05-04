const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

const db = mysql.createConnection({
  user: 'root',
  host: 'localhost',  
  database: 'tugasuts'
});

router.get('/', (req, res) => {
  db.query('SELECT nim, nama, jenis_kelamin, alamat, kota.nama_kota, provinsi.nama_provinsi, telepon, email FROM mahasiswa INNER JOIN kota ON mahasiswa.id_kota = kota.id_kota INNER JOIN provinsi ON kota.id_provinsi = provinsi.id_provinsi', (error, results) => {
    if (error) {
      res.render('mahasiswa', {
        title: 'Aplikasi Mahasiswa | UNUJA',
        error
      });
    } else {
      res.render('mahasiswa', {
        title: 'Aplikasi Mahasiswa | UNUJA',
        data: results,
        activeStateMahasiswa: 'active',
        activeStateDosen: 'non',
        activeStateKota: 'non',
        activeStateProvinsi: 'non',
        activeStateMatkul: 'non',
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
      activeStateMahasiswa: 'active',
      activeStateDosen: 'non',
      activeStateKota: 'non',
      activeStateProvinsi: 'non',
      activeStateMatkul: 'non',
      activeStateJadwal: 'non',
    });
  });
});

router.post('/tambah-mahasiswa', (req, res) => {
  const { nim, nama, jenis_kelamin, alamat, id_kota, telepon, email } = req.body;
  db.query('INSERT INTO mahasiswa VALUES ("", ?, ?, ?, ?, ?, ?,?)', [nim, nama, jenis_kelamin, alamat, id_kota, telepon, email], (error, result) => {
    if (error) {
      res.render('tambah-mahasiswa', {
        title: 'Add Mahasiswa | UNUJA',
        error,
        activeStateMahasiswa: 'active',
        activeStateDosen: 'non',
        activeStateKota: 'non',
        activeStateProvinsi: 'non',
        activeStateMatkul: 'non',
        activeStateJadwal: 'non',
      });
    } else {
      res.redirect(301, '/mahasiswa/');
    }
  });
});

router.get('/edit/:nim', (req, res) => {
  db.query("SELECT tb_mahasiswa.id, nama, nim, tb_prodi.prodi FROM tb_mahasiswa INNER JOIN tb_prodi ON tb_mahasiswa.id_prodi = tb_prodi.id_prodi WHERE nim = ?", [req.params.nim], (error, result) => {
    if (error) {
      res.render('edit', {
        title: 'edit mahasiswa',
        error
      });
    } else {
      db.query('SELECT * FROM tb_prodi', (error, prodi) => {
        res.render('edit', {
          title: 'edit mahasiswa',
          error: null,
          data: result[0],
          prodi
        });
      });
    }
  });
});

router.post('/edit', (req, res) => {
  const { nama, nim, prodi, id } = req.body;
  // return res.json({nama, nim, prodi, id})
  db.query('UPDATE tb_mahasiswa SET nama = ?, nim = ?, id_prodi = ? WHERE id = ?', [nama, nim, prodi, id], (error, result) => {
    if (error) {
      res.redirect('/mahasiswa/edit/' + nim)
    } else {
      res.redirect(301, '/mahasiswa');
    }
  });
});

router.get('/delete/:nim', (req, res) => {
  db.query('DELETE FROM tb_mahasiswa WHERE nim = ?', [req.params.nim], (error, result) => {
    if (error) {
      console.log(error.message);
    } else {
      res.redirect('/mahasiswa');
    }
  });
});

module.exports = router;