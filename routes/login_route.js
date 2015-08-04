var controller = require('../controllers/login_ctrl');
var express    = require('express');
var router     = express.Router();

// Solicitar codigo para realizar el proceso de login.
router.get('/:appkey',controller.loginGET1);

// Crea una sesionn inactiva y envia formulario de login..
router.get('/:appkey/:appcode',controller.loginGET2);

// Recibe datos y realiza login.
router.post('/:appkey/:appcode',controller.loginPOST);

// Elimina la sesion.
router.delete('/:appkey',controller.loginDELETE);

// Exportar ruteador.
module.exports = router;