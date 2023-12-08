const fs = require('fs');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const initDB = require('./config/db');
const authRouter = require('./routes/authRouter');
const userRoutes = require('./routes/users');
const UserController = require('../controllers/userController');



initDB();

mongoose.connect('mongodb://localhost:27017', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'));
db.once('open', () => {
  console.log('Conexión a MongoDB exitosa');
});

const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  thumbnail: String,
  code: String,
  stock: Number,
});

const Producto = mongoose.model('Producto', productSchema);

const filePath = 'products.json';

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Configuración de Passport
passport.use(new LocalStrategy(
  (username, password, done) => {
    // Aquí debes verificar las credenciales del usuario en tu base de datos
    // Replace the following line with your actual user authentication logic
    if (username === 'admin' && password === 'admin') {
      return done(null, { id: 1, username: 'admin' });
    } else {
      return done(null, false, { message: 'Credenciales incorrectas' });
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  // Aquí debes buscar al usuario en tu base de datos
  // Replace the following line with your actual user lookup logic
  const user = { id: 1, username: 'admin' };
  done(null, user);
});

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(bodyParser.json());

// Configuración de session para Passport
app.use(session({
  secret: 'tu_secreto', // Cambia esto a una cadena secreta más segura
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

// Configurar WebSockets
io.on('connection', (socket) => {
  console.log('Usuario conectado');

  socket.on('disconnect', () => {
    console.log('Usuario desconectado');
  });
});

// Obtener la lista de productos (incluyendo el producto recién agregado)
Producto.find({}, (err, products) => {
  if (err) {
    console.error(err);
  } else {
    console.log('Lista de productos:');
    products.forEach((product) => {
      console.log(product);
    });
  }
});

// Rutas de autenticación
app.use('/auth', authRouter);

// Resto de las rutas y configuraciones de la aplicación...

// Iniciar el servidor HTTP
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});