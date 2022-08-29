const router = require('express').Router();

const miscController = require('../controllers/misc.controller');

router.get('/', miscController.home); // Renderizamos la pagina de inicio

module.exports = router