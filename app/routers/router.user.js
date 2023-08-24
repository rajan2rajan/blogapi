const router = require('express').Router();

const userController = require('../controllers/controller.user.js');

// router.post('/', userController.create_user);
router.route('/').get(userController.show_all_users).post(userController.create_user);

module.exports = router;
