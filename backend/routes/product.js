const express = require('express');

const {
  allProducts,
  adminProducts,
  detailProducts,
  createProduct,
  deleteProduct,
  updateProduct,
  createReview,
} = require('../controllers/product.js');
const { authenticationMid, rolechecked } = require('../middleware/auth.js');

const router = express.Router();

router.get('/products', allProducts);
router.get('/admin/products',authenticationMid,rolechecked("admin"), adminProducts);
router.get('/products/:id', detailProducts);
router.post('/products/new',authenticationMid,rolechecked("admin"), createProduct);
router.post('/products/newReview',authenticationMid, createReview);
router.delete('/products/:id',authenticationMid,rolechecked("admin"), deleteProduct);
router.put('/products/:id',authenticationMid,rolechecked("admin"), updateProduct);

module.exports = router;
