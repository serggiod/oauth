var controller = require('../controllers/login_ctrl');
var express    = require('express');
var router     = express.Router();

// Solicitar codigo para realizar el proceso de login.
router.get('/:appkey',controller.loginGETCODE);

// Crea una sesionn inactiva y envia formulario de login..
router.get('/:appkey/:appcode',controller.loginGETFORM);

// Recibe datos y realiza login.
router.post('/:appkey/:appcode',controller.loginPOST);

// Elimina la sesion.
router.delete('/:appkey/:appcode',controller.loginDELETE);

// Exportar ruteador.
module.exports = router;