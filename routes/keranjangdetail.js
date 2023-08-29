const router = require('express').Router()
const auth = require('../middleware/auth')
const keranjangdetailController = require('../controller/keranjangdetailController')
const checkRole = require('../middleware/checkRole')

router.get("/", keranjangdetailController.getKeranjangdetail)
router.get("/:id", auth, keranjangdetailController.getIdKeranjangdetail)
router.post("/", auth, keranjangdetailController.postKeranjangdetail)
router.put("/:id", auth, keranjangdetailController.updateKeranjangdetail)
router.delete("/:id", auth, keranjangdetailController.deleteKeranjangdetail)
router.post("/keranjangdetail", auth, keranjangdetailController.postsKeranjangdetail)
router.put("/tambah/:id", auth, keranjangdetailController.tambahKeranjangdetail)
router.put("/kurang/:id", auth, keranjangdetailController.kurangKeranjangdetail)
module.exports = router