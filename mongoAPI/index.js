const express = require('express');
const cors = require('cors');
require('./config/db');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const bodyParser = require('body-parser');
require('dotenv').config({ path: 'variables.env' });
const routes = require('./routes/index');
const multer =require('multer');
const upload = multer({ dest: './uploads/' })

/* const cajas = require('./routes/cajas');
const clientes = require('./routes/clientes');
const compras = require('./routes/compras');
const empleados = require('./routes/empleados');
const inventario = require('./routes/inventario');
const proveedores = require('./routes/proveedores');
const traslados = require('./routes/traslados');
const ventas = require('./routes/ventas'); */
// Creando la app de express
const app = express();
const sharp =require('sharp');
const path=require('path');
const fs=require('fs');
app.use('/static', express.static(path.join(__dirname,"static")));
app.use('/uploads', express.static(path.join(__dirname,"uploads")));
//validacion de rutas
app.use(cors());
// habilitar body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: process.env.SECRETO,
    key: process.env.KEY,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

// Cargo rutas
app.use('/', routes());

// Va a correr en este puerto
app.listen(3001);

