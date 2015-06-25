var controller = require('../controllers/index_ctrl');
var express    = require('express');
var router     = express.Router();

// Rutea hasta la pagina de inicio.
router.get('/',controller.indexGET);

// Rutea hasta la pagina de estado.
router.head('/',controller.indexHEAD);

// Rutea hasta el instalador de certificados.
router.get('/:appkey',controller.indexCERF);

// Exportar ruteador.
module.exports = router;