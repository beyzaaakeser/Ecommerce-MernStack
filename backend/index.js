const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const db = require('./config/db.js');
const product = require('./routes/product.js');
const user = require('./routes/user.js');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const path = require('path');

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const app = express();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Dosyaların kaydedileceği klasör
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Middleware
const corsOptions = {
  origin: 'http://localhost:5173', // Frontend'in tam adresi
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Accept', 'Authorization'],
  exposedHeaders: ['set-cookie'],
};

// CORS middleware'ini options ile kullan
app.use(cors(corsOptions));
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', product);
app.use('/', user);
app.use((req, res, next) => {
  console.log('Incoming request:', {
    method: req.method,
    path: req.path,
    headers: req.headers,
    body: req.body,
  });
  next();
});

app.post('/register', upload.single('avatar'), (req, res) => {
  try {
    // ... kayıt işlemleri
    res.status(200).json({ message: 'Registration successful' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const PORT = 4000;
app.listen(PORT, async () => {
  await db();
  console.log(`Server running on port ${PORT}`);
});
// Database bağlantısını başlat ve sunucuyu çalıştır
/* const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await db(); // Database bağlantısını bekle
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Server başlatma hatası:', error);
  }
}; */
