const express = require('express');
const router = express.Router({ mergeParams: true });
const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware');
const Reviews = require('../controllers/reviews');


router.post('/', isLoggedIn, validateReview,Reviews.createReview);

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, Reviews.deleteReview);

module.exports = router;
