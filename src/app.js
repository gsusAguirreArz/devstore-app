// ------------------- Import's -------------------
const path = require('path');
const express = require('express');
const methodOverride = require('method-override');
const session = require('express-session');

// ------------------- APP -------------------
const app = express();

// ------------------- Middlewares -------------------
app.use(express.static(path.join(__dirname, './public')));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: true
}));

// ------------------- Template Engine -------------------
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));


// ------------------- Main CODE -------------------
// **** Routes Handler ****
// Routes Import's
const mainRoutes = require('./routes/main.routes');

app.use('/', mainRoutes);

// **** Error Handler ****
// Error Import's
const catchError = require('./middlewares/global/catchError');
const errorHandler = require('./middlewares/global/errorHandler');

app.use(catchError);
app.use(errorHandler);

// **** Shoping cart Handler ****
// Cart Import
const cart = require('./middlewares/global/cart');

app.use(cart);

// ------------------- Exports -------------------
module.exports = app;
