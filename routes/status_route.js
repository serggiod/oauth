var controller = require('../controllers/status_ctrl');
var express    = require('express');
var router     = express.Router();

// Rutea hasta las cabeceras de inicio.
router.get('/',controller.indexGET);

// Rutea hasta la p´agina de estado.
router.get('/:appkey/:appcode',controller.statusGET);

// Exportar ruteador.
module.exports = router;