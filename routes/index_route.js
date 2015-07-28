var controller = require('../controllers/index_ctrl');
var express    = require('express');
var router     = express.Router();

// Rutea hasta las cabeceras de inicio.
router.head('/',controller.indexHEAD);

// Rutea hasta la pagina de inicio.
router.get('/',controller.indexGET);

// Rutea hasta el instalador de certificados.
router.get('/certificate/:appkey',controller.indexCERTIFICATE);

// Exportar ruteador.
module.exports = router;