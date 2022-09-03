require('dotenv').config();

const express = require('express');
const hbs = require('hbs');
const logger = require('morgan')

require('./config/db.config');

const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(logger('dev'));

app.set('views', __dirname + '/views');
app.set('view engine', 'hbs');

hbs.registerPartials(__dirname + '/views/partials'); // Indicamos donde están los partials.

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

const routes = require('./config/routes.config'); // Requerimos el contenido de Routes
app.use(routes); // Usamos el routes 

app.use((err, req, res, next) => {
  console.log(err);
  res.render("error", { err });
});

const port = Number(process.env.PORT || 3000);

app.listen(port, () => {
  console.log('Listening on port ' + port);
});