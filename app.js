const express = require('express');
const path = require('path');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
// routes
app.use('/mahasiswa', require('./routes/mahasiswa'));
app.use('/dosen', require('./routes/dosen'));
app.use('/jadwal', require('./routes/jadwal'));
app.use('/matkul', require('./routes/matkul'));
app.use('/provinsi', require('./routes/provinsi'));
app.use('/kota', require('./routes/kota'));
app.use('/', require('./routes/dashboard'));


app.listen(5000, () => console.log('Server running at port 5000'));

