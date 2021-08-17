const Product = require('../models/product');
const Review = require('../models/review');
const catchAsync = require('../utils/catchAsync');



module.exports.createReview = catchAsync(async (req, res) => {
    const product = await Product.findById(req.params.id);
    const review = new Review(req.body.review);
    review.author = req.user._id;
    product.reviews.push(review);
    await review.save();
    await product.save();
    req.flash('success', 'REVIEW FINALIZADA!');
    res.redirect(`/products/${product._id}`);
    
    
})

module.exports.deleteReview = catchAsync(async (req, res) => {
    const { id, reviewId } = req.params;
    await Product.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'REVIEW BORRADA!');
    res.redirect(`/products/${id}`);
})