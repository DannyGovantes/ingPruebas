const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isAuthor, validateProduct } = require('../middleware');
const Products = require('../controllers/products');
const {storage} = require('../cloudinary');

const multer = require('multer');
const upload = multer({storage})

  
router.route('/')
    .get(Products.index)
    .post(isLoggedIn,  upload.array('image'), validateProduct, catchAsync(Products.createProduct))
    
router.get('/new', isLoggedIn, Products.renderNewForm);

router.route('/:id')
    .get(catchAsync(Products.showProduct))
    .put(isLoggedIn, isAuthor, upload.array('image'), validateProduct, catchAsync(Products.editProduct))
    .delete(isLoggedIn, isAuthor, catchAsync(Products.deleteProduct))



router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(Products.renderEditForm));


module.exports = router;