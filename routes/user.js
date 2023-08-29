const router = require('express').Router()
const auth = require('../middleware/auth')
const userController = require('../controller/userController')
const checkRole = require('../middleware/checkRole')

router.get("/search", auth, userController.getIdEmail)
router.get("/", auth, userController.getUsers)
router.get("/:id", auth, userController.getIdUser)
router.post("/register", userController.postUser)
router.post("/login", userController.login)
router.put('/:id', auth, userController.updateUser)
router.delete('/:id', auth, userController.deleteUser)

module.exports = router