const router = require('express').Router();
const blogController = require('../controllers/controller.book');

// router.get('/book', blogController.show_all_books);
// router.post('/book', blogController.create_book);
// router.delete('/book/:id', blogController.delete_book);

// get and post book
router.route('/').get(blogController.show_all_books).post(blogController.create_book);

//delee update book
router.route('/:id').delete(blogController.delete_book).put(blogController.update_book);

module.exports = router;
