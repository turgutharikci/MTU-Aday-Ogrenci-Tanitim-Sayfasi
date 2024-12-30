const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = 3000;

// JSON verilerini işlemek için middleware
app.use(express.json());

// CORS'u etkinleştir
app.use(cors());

// Veritabanı bağlantısı
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', // Eğer bir şifreniz varsa, buraya yazın
    database: 'universite_tanitim'
});

// Bağlantıyı başlat
db.connect(err => {
    if (err) {
        console.error('Veritabanı bağlantısı başarısız: ' + err.stack);
        return;
    }
    console.log('Veritabanına bağlanıldı');
});

// Frontend klasörünü statik olarak sun
app.use('/frontend', express.static(path.join(__dirname, 'frontend')));

// Ana sayfa için endpoint
app.get('/', (req, res) => {
    res.send('Backend Çalışıyor!');
});

// Fakülteler listesini döndüren API endpoint'i
app.get('/api/fakulteler', (req, res) => {
    const query = 'SELECT id, ad FROM fakulteler'; // 'id' ve 'ad' sütunlarının varlığını doğrulayın
    db.query(query, (err, results) => {
        if (err) {
            console.error('Fakülteler sorgusunda hata:', err);
            res.status(500).json({ message: 'Veritabanı hatası', error: err });
        } else {
            res.json(results);
        }
    });
});

// Meslek Yüksekokulları API Rotası
app.get('/api/myo', (req, res) => {
    const query = 'SELECT id, ad FROM meslek_yuksekokullari'; // Tablo yapısına uygun sütun adlarını doğrulayın
    db.query(query, (err, results) => {
        if (err) {
            console.error('Meslek Yüksekokulları sorgusunda hata:', err);
            res.status(500).json({ message: 'Veritabanı hatası', error: err });
        } else {
            res.json(results);
        }
    });
});

// Yüksekokullar API Rotası
app.get('/api/yuksekokullar', (req, res) => {
    const query = 'SELECT id, ad FROM yuksekokullar'; // Tablo yapısına uygun sütun adlarını doğrulayın
    db.query(query, (err, results) => {
        if (err) {
            console.error('Yüksekokullar sorgusunda hata:', err);
            res.status(500).json({ message: 'Veritabanı hatası', error: err });
        } else {
            res.json(results);
        }
    });
});

// Sunucuyu başlat
app.listen(PORT, () => {
    console.log(`Sunucu http://localhost:${PORT} üzerinde çalışıyor.`);
});
