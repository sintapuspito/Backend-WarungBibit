const router = require('express').Router()
const auth = require('../middleware/auth')
const pesananController = require('../controller/pesananController')
const checkRole = require('../middleware/checkRole')
const Uploader = require('../middleware/uploader')

router.get("/", auth, pesananController.getPesanan)
router.get("/riwayat/:id", auth, pesananController.getIdPesanan)
router.post("/", auth, pesananController.postPesanan)
router.put("/:id", auth, Uploader.single('buktibayar'), pesananController.updatePesanan)
router.delete("/:id", auth, pesananController.deletePesanan)

module.exports = router