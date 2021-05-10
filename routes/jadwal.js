const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

const db = mysql.createConnection({
  user: 'root',
  host: 'localhost',  
  database: 'db_crud_nodejs_uts'
});

router.get('/', (req, res) => {
  db.query("SELECT id_jadwal, tahun_awal, tahun_akhir, mahasiswa.nim, matkul.nama AS nama_matkul, dosen.nama AS nama_dosen, mahasiswa.nama AS nama_mahasiswa, jadwal.semester FROM jadwal INNER JOIN matkul ON matkul.id_matkul = jadwal.id_matkul INNER JOIN dosen ON dosen.id_dosen = jadwal.id_dosen INNER JOIN mahasiswa ON mahasiswa.nim = jadwal.nim", (error, results) => {
    if (error) {
      res.render('jadwal', {
        title: 'aplikasi mahasiswa | unuja',
        data: error,
      });
    } else {
      db.query('SELECT * FROM dosen', (error, dosen) => {
        db.query('SELECT * FROM matkul', (error, matkul) => {
          db.query('SELECT * FROM mahasiswa', (error, mahasiswa) => {
            res.render('jadwal', {
              title: 'Aplikasi Mahasiswa | UNUJA',
              data: results,
              data_dosen: dosen,
              data_matkul: matkul,
              data_mahasiswa: mahasiswa,
              activeStateBeranda:'non',
              activeStateMahasiswa: 'non',
              activeStateDosen: 'non',
              activeStateKota: 'non',
              activeStateProvinsi: 'non',
              activeStateMatkul: 'dd',
              activeStateJadwal: 'active',
            });
          });
        });
      });
    }
  });
});
router.post('/search-mahasiswa', (req, res) => {
  const { nim, semester } = req.body;
  if (!semester) {
    db.query("SELECT id_jadwal, tahun_awal, tahun_akhir, mahasiswa.nim, matkul.nama AS nama_matkul, dosen.nama AS nama_dosen, mahasiswa.nama AS nama_mahasiswa, jadwal.semester FROM jadwal INNER JOIN matkul ON matkul.id_matkul = jadwal.id_matkul INNER JOIN dosen ON dosen.id_dosen = jadwal.id_dosen INNER JOIN mahasiswa ON mahasiswa.nim = jadwal.nim WHERE mahasiswa.nim ='" + nim + "'", (error, results) => {
      if (error) {
        res.render('jadwal', {
          title: 'aplikasi mahasiswa | unuja',
          data: error,
        });
      }
      else {
        db.query('SELECT * FROM dosen', (error, dosen) => {
          db.query('SELECT * FROM matkul', (error, matkul) => {
            db.query('SELECT * FROM mahasiswa', (error, mahasiswa) => {
              res.render('jadwal', {
                title: 'Aplikasi Mahasiswa | UNUJA',
                data: results,
                data_dosen: dosen,
                data_matkul: matkul,
                data_mahasiswa: mahasiswa,
                activeStateBeranda: 'non',
                activeStateMahasiswa: 'non',
                activeStateDosen: 'non',
                activeStateKota: 'non',
                activeStateProvinsi: 'non',
                activeStateMatkul: 'dd',
                activeStateJadwal: 'active',
              });
            });
          });
        });
      }
    });
  } else if (!nim) {
    db.query("SELECT id_jadwal, tahun_awal, tahun_akhir, mahasiswa.nim, matkul.nama AS nama_matkul, dosen.nama AS nama_dosen, mahasiswa.nama AS nama_mahasiswa, jadwal.semester FROM jadwal INNER JOIN matkul ON matkul.id_matkul = jadwal.id_matkul INNER JOIN dosen ON dosen.id_dosen = jadwal.id_dosen INNER JOIN mahasiswa ON mahasiswa.nim = jadwal.nim", (error, results) => {
    if (error) {
      res.render('jadwal', {
        title: 'aplikasi mahasiswa | unuja',
        data: error,
      });
    } else {
      db.query('SELECT * FROM dosen', (error, dosen) => {
        db.query('SELECT * FROM matkul', (error, matkul) => {
          db.query('SELECT * FROM mahasiswa', (error, mahasiswa) => {
            res.render('jadwal', {
              title: 'Aplikasi Mahasiswa | UNUJA',
              data: results,
              data_dosen: dosen,
              data_matkul: matkul,
              data_mahasiswa: mahasiswa,
              activeStateBeranda:'non',
              activeStateMahasiswa: 'non',
              activeStateDosen: 'non',
              activeStateKota: 'non',
              activeStateProvinsi: 'non',
              activeStateMatkul: 'dd',
              activeStateJadwal: 'active',
            });
          });
        });
      });
    }
  });
  } else {
    db.query("SELECT id_jadwal, tahun_awal, tahun_akhir, mahasiswa.nim, matkul.nama AS nama_matkul, dosen.nama AS nama_dosen, mahasiswa.nama AS nama_mahasiswa, jadwal.semester FROM jadwal INNER JOIN matkul ON matkul.id_matkul = jadwal.id_matkul INNER JOIN dosen ON dosen.id_dosen = jadwal.id_dosen INNER JOIN mahasiswa ON mahasiswa.nim = jadwal.nim WHERE mahasiswa.nim ='" + nim + "' AND jadwal.semester ='" + semester + "'", (error, results) => {
      if (error) {
        res.render('jadwal', {
          title: 'aplikasi mahasiswa | unuja',
          data: error,
        });
      } else {
        db.query('SELECT * FROM dosen', (error, dosen) => {
          db.query('SELECT * FROM matkul', (error, matkul) => {
            db.query('SELECT * FROM mahasiswa', (error, mahasiswa) => {
              res.render('jadwal', {
                title: 'Aplikasi Mahasiswa | UNUJA',
                data: results,
                data_dosen: dosen,
                data_matkul: matkul,
                data_mahasiswa: mahasiswa,
                activeStateBeranda: 'non',
                activeStateMahasiswa: 'non',
                activeStateDosen: 'non',
                activeStateKota: 'non',
                activeStateProvinsi: 'non',
                activeStateMatkul: 'dd',
                activeStateJadwal: 'active',
              });
            });
          });
        });
      }
    });
  }
});

router.post('/search-dosen', (req, res) => {
  const { id_dosen, id_matkul } = req.body;
  if (!id_matkul) {
    db.query("SELECT id_jadwal, tahun_awal, tahun_akhir, mahasiswa.nim, matkul.nama AS nama_matkul, dosen.nama AS nama_dosen, mahasiswa.nama AS nama_mahasiswa, jadwal.semester FROM jadwal INNER JOIN matkul ON matkul.id_matkul = jadwal.id_matkul INNER JOIN dosen ON dosen.id_dosen = jadwal.id_dosen INNER JOIN mahasiswa ON mahasiswa.nim = jadwal.nim WHERE dosen.id_dosen ='" + id_dosen + "'", (error, results) => {
      if (error) {
        res.render('jadwal', {
          title: 'aplikasi mahasiswa | unuja',
          data: error,
        });
      }
      else {
        db.query('SELECT * FROM dosen', (error, dosen) => {
          db.query('SELECT * FROM matkul', (error, matkul) => {
            db.query('SELECT * FROM mahasiswa', (error, mahasiswa) => {
              res.render('jadwal', {
                title: 'Aplikasi Mahasiswa | UNUJA',
                data: results,
                data_dosen: dosen,
                data_matkul: matkul,
                data_mahasiswa: mahasiswa,
                activeStateBeranda: 'non',
                activeStateMahasiswa: 'non',
                activeStateDosen: 'non',
                activeStateKota: 'non',
                activeStateProvinsi: 'non',
                activeStateMatkul: 'dd',
                activeStateJadwal: 'active',
              });
            });
          });
        });
      }
    });
  } else if (!id_dosen) {
    db.query("SELECT id_jadwal, tahun_awal, tahun_akhir, mahasiswa.nim, matkul.nama AS nama_matkul, dosen.nama AS nama_dosen, mahasiswa.nama AS nama_mahasiswa, jadwal.semester FROM jadwal INNER JOIN matkul ON matkul.id_matkul = jadwal.id_matkul INNER JOIN dosen ON dosen.id_dosen = jadwal.id_dosen INNER JOIN mahasiswa ON mahasiswa.nim = jadwal.nim", (error, results) => {
    if (error) {
      res.render('jadwal', {
        title: 'aplikasi mahasiswa | unuja',
        data: error,
      });
    } else {
      db.query('SELECT * FROM dosen', (error, dosen) => {
        db.query('SELECT * FROM matkul', (error, matkul) => {
          db.query('SELECT * FROM mahasiswa', (error, mahasiswa) => {
            res.render('jadwal', {
              title: 'Aplikasi Mahasiswa | UNUJA',
              data: results,
              data_dosen: dosen,
              data_matkul: matkul,
              data_mahasiswa: mahasiswa,
              activeStateBeranda:'non',
              activeStateMahasiswa: 'non',
              activeStateDosen: 'non',
              activeStateKota: 'non',
              activeStateProvinsi: 'non',
              activeStateMatkul: 'dd',
              activeStateJadwal: 'active',
            });
          });
        });
      });
    }
  });
  } else {
    db.query("SELECT id_jadwal, tahun_awal, tahun_akhir, mahasiswa.nim, matkul.nama AS nama_matkul, dosen.nama AS nama_dosen, mahasiswa.nama AS nama_mahasiswa, jadwal.semester FROM jadwal INNER JOIN matkul ON matkul.id_matkul = jadwal.id_matkul INNER JOIN dosen ON dosen.id_dosen = jadwal.id_dosen INNER JOIN mahasiswa ON mahasiswa.nim = jadwal.nim WHERE dosen.id_dosen ='" + id_dosen + "' AND matkul.id_matkul ='" + id_matkul + "'", (error, results) => {
      if (error) {
        res.render('jadwal', {
          title: 'aplikasi mahasiswa | unuja',
          data: error,
        });
      } else {
        db.query('SELECT * FROM dosen', (error, dosen) => {
          db.query('SELECT * FROM matkul', (error, matkul) => {
            db.query('SELECT * FROM mahasiswa', (error, mahasiswa) => {
              res.render('jadwal', {
                title: 'Aplikasi Mahasiswa | UNUJA',
                data: results,
                data_dosen: dosen,
                data_matkul: matkul,
                data_mahasiswa: mahasiswa,
                activeStateBeranda: 'non',
                activeStateMahasiswa: 'non',
                activeStateDosen: 'non',
                activeStateKota: 'non',
                activeStateProvinsi: 'non',
                activeStateMatkul: 'dd',
                activeStateJadwal: 'active',
              });
            });
          });
        });
      }
    });
  }
});

router.get('/tambah', (req, res) => {
  db.query('SELECT * FROM dosen', (error, dosen) => {
    db.query('SELECT * FROM matkul', (error, matkul) => {
      db.query('SELECT * FROM mahasiswa', (error, mahasiswa) => {
        res.render('tambah-jadwal', {
          title: 'Aplikasi Mahasiswa | UNUJA',
          data_dosen: dosen,
          data_matkul: matkul,
          data_mahasiswa: mahasiswa,
          activeStateBeranda:'non',
          activeStateMahasiswa: 'non',
          activeStateDosen: 'non',
          activeStateKota: 'non',
          activeStateProvinsi: 'non',
          activeStateMatkul: 'dd',
          activeStateJadwal: 'active',
        });
      });
    });
  });
});

router.post('/tambah-jadwal', (req, res) => {
  const { id_dosen, id_matkul, nim, tahun_awal, tahun_akhir, semester } = req.body;
  db.query('INSERT INTO jadwal VALUES ("", ?, ?, ?, ?, ?, ?)', [id_dosen, id_matkul, nim, tahun_awal, tahun_akhir, semester], (error, result) => {
    if (error) {
      res.render('tambah-jadwal', {
        title: 'Aplikasi Mahasiswa | UNUJA',
        error
      });
    } else {
      res.redirect(301, '/jadwal/');
    }
  });
});

router.get('/edit/:id_jadwal', (req, res) => {
  db.query("SELECT id_jadwal, tahun_awal, tahun_akhir, matkul.nama AS nama_matkul, dosen.nama AS nama_dosen, mahasiswa.nama AS nama_mahasiswa, jadwal.semester FROM jadwal INNER JOIN matkul ON matkul.id_matkul = jadwal.id_matkul INNER JOIN dosen ON dosen.id_dosen = jadwal.id_dosen INNER JOIN mahasiswa ON mahasiswa.nim = jadwal.nim WHERE id_jadwal = ?", [req.params.id_jadwal], (error, result) => {
    if (error) {
      res.render('edit-jadwal', {
        title: 'edit dosen',
        error
      });
    } else {
      db.query('SELECT nama AS nama_dosen, id_dosen FROM dosen', (error, dosen) => {
        db.query('SELECT nama AS nama_matkul, id_matkul FROM matkul', (error, matkul) => {
          db.query('SELECT nama AS nama_mahasiswa, nim FROM mahasiswa', (error, mahasiswa) => {
            res.render('edit-jadwal', {
              title: 'Aplikasi Mahasiswa | UNUJA',
              data: result[0],
              data_dosen: dosen,
              data_matkul: matkul,
              data_mahasiswa: mahasiswa,
              activeStateBeranda:'non',
              activeStateMahasiswa: 'non',
              activeStateDosen: 'non',
              activeStateKota: 'non',
              activeStateProvinsi: 'non',
              activeStateMatkul: 'dd',
              activeStateJadwal: 'active',
            });
          });
        });
      });
    }
  });
});

router.post('/update', (req, res) => {
  const { id_dosen, id_matkul, nim, tahun_awal, tahun_akhir, semester, id_jadwal } = req.body;
  // return res.json({nama, nim, prodi, id})
  db.query("UPDATE jadwal SET id_dosen = '"+id_dosen+"', id_matkul = '"+id_matkul+"', nim = '"+nim+"', tahun_awal = '"+tahun_awal+"', tahun_akhir = '"+tahun_akhir+"', semester = '"+semester+"' WHERE id_jadwal = '"+id_jadwal+"'", (error, result) => {
    if (error) {
      res.redirect('/jadwal/edit-jadwal/')
    } else {
      res.redirect('/jadwal');
    }
  });
});

router.get('/delete/:id_jadwal', (req, res) => {
  db.query('DELETE FROM jadwal WHERE id_jadwal = ?', [req.params.id_jadwal], (error, result) => {
    if (error) {
      console.log(error.message);
    } else {
      res.redirect('/jadwal');
    }
  });
});

module.exports = router;