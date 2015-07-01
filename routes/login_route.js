var controller = require('../controllers/login_ctrl');
var express    = require('express');
var router     = express.Router();

router.head('/',controller.loginHEAD);

/*
router.get('/',controller.loginGET);

router.post('/',controller.loginPOST);

router.delete('/',controller.loginDELETE);

module.exports = router;
*/