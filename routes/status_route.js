var controller = require('../controllers/status_ctrl');
var express    = require('express');
var router     = express.Router();

// Rutea hasta las cabeceras de inicio.
router.head('/',controller.indexHEAD);

// Exportar ruteador.
module.exports = router;