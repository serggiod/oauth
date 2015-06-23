var controller = require('../controllers/login_ctrl');
var express    = require('express');
var router     = express.Router();

router.head('/',controller.loginHEAD);

router.get('/',controller.loginGET);

router.post('/',controller.loginPOST);

router.delete('/',controller.loginDELETE);

router.put('/',controller.loginPUT);

router.options('/',controller.loginOPTIONS);

module.exports = router;