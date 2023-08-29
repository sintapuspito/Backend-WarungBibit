const router = require('express').Router()

require("dotenv").config();
// import package swagger 
const swaggerUi = require('swagger-ui-express');
// import file json
const swaggerDocument = require('../docs/swagger.json');

// api docs
router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));

const Auth = require('./user')
const Keranjang = require('./keranjang')
const Keranjangdetail = require('./keranjangdetail')
const Pesanan = require('./pesanan')
const Pesanandetail = require('./pesanandetail')
const Product = require('./product')


// API server
router.use('/api/v1/auth/', Auth)
router.use('/api/v1/keranjang/', Keranjang)
router.use('/api/v1/keranjangdetail/', Keranjangdetail)
router.use('/api/v1/pesanan/',Pesanan)
router.use('/api/v1/pesanandetail/',Pesanandetail)
router.use('/api/v1/product/',Product)

module.exports = router
