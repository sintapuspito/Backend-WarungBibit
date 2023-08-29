const router = require('express').Router()
const auth = require('../middleware/auth')
const productController = require('../controller/productController')
const Uploader = require('../middleware/uploader')

router.get("/", productController.getProduct)
router.get("/:id", auth, productController.getIdProduct)
router.post("/", auth, Uploader.single('gambar'), productController.postProduct)
router.put("/:id", auth, Uploader.single('gambar'), productController.updateProduct)
router.delete("/:id", auth, productController.deleteProduct)

module.exports = router