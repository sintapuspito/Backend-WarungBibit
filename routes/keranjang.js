const router = require('express').Router()
const auth = require('../middleware/auth')
const keranjangController = require('../controller/keranjangController')

router.get("/", keranjangController.getKeranjang)
router.get("/:id", auth, keranjangController.getIdKeranjang)
router.post("/", auth, keranjangController.postKeranjang)
router.put("/:id", auth, keranjangController.updateKeranjang)
router.delete("/:id", auth, keranjangController.deleteKeranjang)
router.post('/keranjang', auth, keranjangController.getUserIdKeranjang)

module.exports = router