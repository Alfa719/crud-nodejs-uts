const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

const db = mysql.createConnection({
  user: 'root',
  host: 'localhost',  
  database: 'db_crud_nodejs_uts'
});

router.get('/', (req, res) => {
  db.query('SELECT COUNT(*) AS jumlah_dosen FROM dosen', (error, dosen) => {
    db.query('SELECT COUNT(*) AS jumlah_matkul FROM matkul', (error, matkul) => {
      db.query('SELECT COUNT(*) AS jumlah_mahasiswa FROM mahasiswa', (error, mahasiswa) => {
        db.query('SELECT COUNT(*) AS jumlah_jadwal FROM jadwal', (error, jadwal) => {
          db.query('SELECT COUNT(*) AS jumlah_provinsi FROM provinsi', (error, provinsi) => {
            db.query('SELECT COUNT(*) AS jumlah_kota FROM kota', (error, kota) => {
              res.render('dashboard', {
                title: 'Aplikasi Mahasiswa | UNUJA',
                data_dosen: dosen[0],
                data_mahasiswa : mahasiswa[0],
                data_matkul : matkul[0],
                data_jadwal : jadwal[0],
                data_provinsi : provinsi[0],
                data_kota : kota[0],
                activeStateBeranda:'active',
                activeStateMahasiswa: 'non',
                activeStateDosen: 'non',
                activeStateKota: 'non',
                activeStateProvinsi: 'non',
                activeStateMatkul: 'dd',
                activeStateJadwal: 'non',
              });
            });
          });
        });
      });
    });
  });
});



module.exports = router;