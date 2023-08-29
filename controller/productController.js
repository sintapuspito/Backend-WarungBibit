const { product } = require('../models')
const imagekit = require('../lib/imageKit')
const getProduct = async (req, res) => {
  data = await product.findAll({
    order: [["id", "Asc"]]
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
      status: "error",
      message: error.message
    })
  }
}

const getIdProduct = async (req, res) => {
  try {
    const id = req.params.id
    const data = await product.findByPk(id)

    // TODO: Validasi apakah id ada
    if (data === null) {
      return res.status(404).json({
        status: 'failed',
        message: `Data tidak ditemukan`
      })
    }

    res.status(200).json({
      data : data
    })
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message
    })
  }
}

const postProduct = async (req, res) => {
  try {
    const datas = req.body
    const file = req.file

    const validFormat = file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg' || file.mimetype == 'image/gif';
    if (!validFormat) {
      res.status(400).json({
        message: "Format Gambar Tidak Sesuai"
      })
    }
    const split = file.originalname.split('.')
    const ext = split[split.length - 1]

    const img = await imagekit.upload({
        file: file.buffer, 
        fileName: `IMG-${Date.now()}.${ext}`,
    })


    const data = await product.create({
      ...datas,
      gambar: img.url
    })

    res.status(201).json({
      message : "Data berhasil ditambahkan"
    })
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error.message
    })
  }
}

const updateProduct = async (req, res) => {
  try {
    const { ...rest } = req.body
    const id = req.params.id
    const file = req.file
    const dataId = await product.findByPk(id)
    if (dataId === null) {
      return res.status(404).json({
        status: 'failed',
        message: `Data tidak ditemukan`
      })
    }
    
    if(!file){
      await product.update({
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

    if (dataId === null) {
      return res.status(404).json({
        status: 'failed',
        message: `Data tidak ditemukan`
      })
    }

    await product.update({
      ...rest,
      gambar: img.url
    }, {
      where: {
        id
      }
    })
    return res.status(200).json({
      status: 'success',
      message: `Data berhasil terupdate`
    })
  } catch (err) {
    return res.status(400).json({
      status: "failed",
      message: err.message
    })
  }
}

const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id

    const dataId = await product.findByPk(id)

    // TODO: Validasi apakah id ada
    if (dataId === null) {
      res.status(404).json({
        status: 'failed',
        message: `Data tidak ditemukan`
      })
    }

    await product.destroy({
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
  getProduct,
  getIdProduct,
  postProduct,
  updateProduct,
  deleteProduct
}