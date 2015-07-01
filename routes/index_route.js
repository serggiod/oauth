var controller = require('../controllers/index_ctrl');
var express    = require('express');
var router     = express.Router();

console.log(typeof(controller.indexGET));
console.log(typeof(controller.indexHEAD));
console.log(typeof(controller.indexCERF)); 
// Rutea hasta la pagina de inicio.
router.get('/',controller.indexGET);

// Rutea hasta las cabeceras de inicio.
router.head('/',controller.indexHEAD);

// Rutea hasta el instalador de certificados.
router.get('/:appkey',controller.indexCERF);

// Exportar ruteador.
module.exports = router;