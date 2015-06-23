var controller = require('../controllers/index_ctrl');
var express    = require('express');
var router     = express.Router();

// Rutea hasta la pagina de inicio.
router.get('/',controller.indexGET);

// Rutea hasta la pagina de estado.
router.status('/',controller.indexSTATUS);

// Rutea hasta el instalador de certificados.
router.get('/certificate/:appkey',controller.certificateGET);

// Exportar ruteador.
module.exports = router;