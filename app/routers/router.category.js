const router = require('express').Router();

const categoryController = require('../controllers/controller.category');
const validator = require('../middlewares/middleware.validator');
const categorySchema = require('../request/schema.category');

// router.get('/category', categoryController.show_all_category);
// router.post('/category', categoryController.create_category);
// router.delete('/category/:id', categoryController.delete_category);

router
    .route('/')
    .get(categoryController.show_all_category)
    .post(validator(categorySchema), categoryController.create_category);

router.route('/:id').delete(categoryController.delete_category);

module.exports = router;
