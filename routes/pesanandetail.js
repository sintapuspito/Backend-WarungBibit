const router = require('express').Router()
const auth = require('../middleware/auth')
const pesanandetailController = require('../controller/pesanandetailController')

router.get("/", pesanandetailController.getPesanandetail)
router.get("/:id", auth, pesanandetailController.getIdPesanandetail)
router.post("/", auth, pesanandetailController.postPesanandetail)
router.put("/:id", auth, pesanandetailController.updatePesanandetail)
router.delete("/:id", auth, pesanandetailController.deletePesanandetail)

module.exports = router