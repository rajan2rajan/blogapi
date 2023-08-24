const router = require('express').Router();

const categoryController = require('../controllers/controller.category');

// router.get('/category', categoryController.show_all_category);
// router.post('/category', categoryController.create_category);
// router.delete('/category/:id', categoryController.delete_category);

router.route('/').get(categoryController.show_all_category).post(categoryController.create_category);

router.route('/:id').delete(categoryController.delete_category);

module.exports = router;
