const { pesanan } = require('../models')
const { keranjang } = require('../models')
const { keranjangdetail } = require('../models')
const { pesanandetail } = require('../models')
const { product } = require('../models')
const imagekit = require('../lib/imageKit')

const getPesanan = async (req, res) => {
  const data = await pesanan.findAll({
    order: [["id", "Asc"]],
    include: { all: true, nested: true },
  })

  try {
    if (data.length) {
      return res.status(200).json({
        data: data
      })
    } else {
      return res.status(200).json({
        message: "Data tidak ada",
      })
    }

  } catch (error) {
    res.status(400).json({
      status: "success",
      message: error.message
    })
  }
}

const getIdPesanan = async (req, res) => {
  try {
    const userid = req.params.id
    const data = await pesanan.findAll({
      where: {
        user_id: userid
      }
      , include: { all: true, nested: true },
    })

    // TODO: Validasi apakah id ada
    if (data === null) {
      return res.status(404).json({
        status: 'failed',
        message: `Data tidak ditemukan`
      })
    }

    res.status(200).json({
      data: data
    })
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message
    })
  }
}

const postPesanan = async (req, res) => {
  try {
    const datas = req.body
    const data = await pesanan.create({
      ...datas
    })

    const cart = await keranjangdetail.findAll({
      where: {
        keranjang_id: datas.keranjang_id
      },
      include: { all: true, nested: true },
    })

    for (let i = 0; i < cart.length; i++) {
      await pesanandetail.create({
        product_id: cart[i].product_id,
        pesanan_id: data.id,
        jumlah: cart[i].jumlah
      })
      let total = cart[i].product.stok - cart[i].jumlah
      await product.update({
        stok : total
      },{
        where: {
          id : cart[i].product_id
        }
      })

      await keranjangdetail.destroy({
        where: {
          id: cart[i].id
        }
      })
    }
    await keranjang.update({
      total: 0
    }, {
      where: {
        id: datas.keranjang_id
      }
    })

    res.status(201).json({
      message: "Data berhasil ditambahkan"
    })
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error.message
    })
  }
}

const updatePesanan = async (req, res) => {
  try {
    const { ...rest } = req.body
    const id = req.params.id
    const file = req.file
    const dataId = await pesanan.findByPk(id)
    if (dataId === null) {
      return res.status(404).json({
        status: 'failed',
        message: `Data tidak ditemukan`
      })
    }

    if (!file) {
      await pesanan.update({
        ...rest
      }, {
        where: {
          id
        }
      })
      return res.status(200).json({
        status: 'success',
        message: `Data berhasil diupdate`
      })
    }

    const validFormat = file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg' || file.mimetype == 'image/gif';
    if (!validFormat) {
      return res.status(400).json({
        message: "Format Gambar Tidak Sesuai"
      })
    }
    const split = file.originalname.split('.')
    const ext = split[split.length - 1]

    const img = await imagekit.upload({
      file: file.buffer,
      fileName: `IMG-${Date.now()}.${ext}`,
    })


    await pesanan.update({
      ...rest,
      buktibayar: img.url,
      status: "Sedang Melakukan Konfirmasi"
    }, {
      where: {
        id
      }
    })
    res.status(200).json({
      message: `Data berhasil terupdate`
    })
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message
    })
  }
}

const deletePesanan = async (req, res) => {
  try {
    const id = req.params.id

    const dataId = await pesanan.findByPk(id)

    // TODO: Validasi apakah id ada
    if (dataId === null) {
      res.status(404).json({
        message: `Data tidak ditemukan`
      })
    }

    await pesanan.destroy({
      where: {
        id
      }
    })

    res.status(200).json({
      status: 'success',
      message: `Data berhasil dihapus`
    })
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message
    })
  }
}

module.exports = {
  getPesanan,
  getIdPesanan,
  postPesanan,
  updatePesanan,
  deletePesanan
}