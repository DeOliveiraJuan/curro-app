require('dotenv').config();

const express = require('express');
const hbs = require('hbs');
const logger = require('morgan')
const passport = require('passport')

const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false}));
app.use(logger('dev'));

