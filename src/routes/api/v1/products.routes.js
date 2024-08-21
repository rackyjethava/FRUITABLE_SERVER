const express = require('express');
const { ProductController } = require('../../../controller');
const upload = require('../../../middelware/upload');

const router = express.Router();

router.get(
    '/get-product/:product_id',
  ProductController.getProduct
)

router.get(
    '/list-product',
    ProductController.listProducts
)

router.post(
    '/add-product',
    upload.single("image"),
    ProductController.addProduct
)

router.put(
    '/update-product/:product_id',
    upload.single("image"),
    ProductController.updateProduct
)

router.delete(
    '/delete-product/:product_id',
    ProductController.deleteProduct
)

router.get(
    "/count-product",
    ProductController.countproduct
)

router.get(
    "/serch",
    ProductController.serchProduct
)

module.exports = router;