const router = require('express').Router();
const isAuth = require('../middlewares/middleware.auth.js');

const authController = require('../controllers/controller.auth.js');

router.post('/login', authController.login_user);
router.post('/register', authController.create_user);
router.post('/refresh', authController.refresh_token_recive);
router.post('/logout', isAuth, authController.logout_user);

module.exports = router;
