const { keranjangdetail } = require('../models')
const { Op } = require("sequelize");
const { keranjang } = require('../models');

const getKeranjangdetail = async (req, res) => {
  const data = await keranjangdetail.findAll({
    order: [["id", "Asc"]],
    include: { all: true, nested: true }
  })

  try {
    if (data.length) {
      return res.status(200).json({
        data: data
      })
    } else {
      return res.status(200).json({
        data: []
      })
    }

  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message
    })
  }
}

const tambahKeranjangdetail = async (req, res) => {
  let keranjangid = req.params.id
  let produkid = req.body.product_id

  const data = await keranjangdetail.findOne({
    include: { all: true, nested: true },
    where: {
      [Op.and]: [
        { id: keranjangid },
        { product_id: produkid }
      ]
    }
  })
  const datakeranjang = await keranjang.findOne({

    where: {
      id: data.keranjang_id
    },

  })
  await keranjangdetail.update({
    jumlah: data.jumlah + 1
  }, {
    where: {
      [Op.and]: [
        { id: keranjangid },
        { product_id: produkid }
      ]
    }
  })
  await keranjang.update({
    total: datakeranjang.total + (1 * data.product.harga)
  }, {
    where: {
      [Op.and]: [
        { id: data.keranjang_id }
      ]
    }
  })

  return res.status(200).json({
    message: "Sukses"
  })

}

const kurangKeranjangdetail = async (req, res) => {
  try {
    let keranjangid = req.params.id
    let produkid = req.body.product_id

    const data = await keranjangdetail.findOne({
      include: { all: true, nested: true },
      where: {
        [Op.and]: [
          { id: keranjangid },
          { product_id: produkid }
        ]
      }
    })
    const datakeranjang = await keranjang.findOne({

      where: {
        id: data.keranjang_id
      },

    })
    await keranjangdetail.update({
      jumlah: data.jumlah - 1
    }, {
      where: {
        [Op.and]: [
          { id: keranjangid },
          { product_id: produkid }
        ]
      }
    })
    await keranjang.update({
      total: datakeranjang.total + (-1 * data.product.harga)
    }, {
      where: {
        [Op.and]: [
          { id: data.keranjang_id }
        ]
      }
    })

    return res.status(200).json({
      message: "Sukses"
    })

  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message
    })
  }
}

const postsKeranjangdetail = async (req, res) => {
  try {
    let keranjangid = req.body.keranjang_id
    let produkid = req.body.product_id
    let jumlah = req.body.jumlah
    const data = await keranjangdetail.findOne({
      where: {
        [Op.and]: [
          { keranjang_id: keranjangid },
          { product_id: produkid }
        ]
      },
      include: { all: true, nested: true },
    })
    console.log("produk ----")
    const datakeranjang = await keranjang.findOne({
      where: {
        id: keranjangid
      }
    })

    if (!data) {
      const datakeranjang = await keranjangdetail.create({
        product_id: produkid,
        keranjang_id: keranjangid,
        jumlah: jumlah
      })
      const data = await keranjang.findOne({
        where: {
          id: keranjangid
        },
        include: { all: true, nested: true },
      })
      const data1 = await keranjangdetail.findOne({
        where: {
          [Op.and]: [
            { id: datakeranjang.id },
            { product_id: produkid }
          ]
        },
        include: { all: true, nested: true },
      })
      await keranjang.update({
        total: data.total + (jumlah * data1.product.harga)
      }, {
        where: {
          id: keranjangid
        }
      })


      return res.status(200).json({
        message: "Berhasil Menambahkan Produk Ke Keranjang"
      })
    }

    tambahdata = data.dataValues.jumlah + jumlah
    await keranjangdetail.update({
      jumlah: tambahdata,
    }, {
      where: {
        [Op.and]: [
          { keranjang_id: keranjangid },
          { product_id: produkid }
        ]
      }
    })


    await keranjang.update({
      total: datakeranjang.total + (jumlah * data.product.harga)
    }, {
      where: {
        id: keranjangid
      }
    })
    return res.status(200).json({
      message: "Berhasil Menambahkan Produk Ke Keranjang"
    })


  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message
    })
  }
}

const getIdKeranjangdetail = async (req, res) => {
  try {
    const id = req.params.id
    const data = await keranjangdetail.findByPk(id)

    // TODO: Validasi apakah id ada
    if (data === null) {
      return res.status(404).json({
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

const postKeranjangdetail = async (req, res) => {
  try {
    const datas = req.body

    const data = await keranjangdetail.create({
      ...datas
    })

    const datakeranjang = await keranjang.findOne({
      where: {
        id: datas.keranjang_id
      }
    })

    keranjang.update({
      total: datakeranjang.total + (data.jumlah * data.product.harga)
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

const updateKeranjangdetail = async (req, res) => {
  try {
    const { ...rest } = req.body
    const id = req.params.id

    const dataKeranjangDetail = await keranjangdetail.findByPk(id)

    // TODO: Validasi apakah id ada
    if (dataKeranjangDetail === null) {
      res.status(404).json({
        status: 'failed',
        message: `Data tidak ditemukan`
      })
    }

    await keranjangdetail.update({
      ...rest
    }, {
      where: {
        id
      }
    })
    res.status(200).json({
      message: `Data berhasil diupdate`
    })
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message
    })
  }
}

const deleteKeranjangdetail = async (req, res) => {
  try {
    const id = req.params.id

    const dataKeranjangDetail = await keranjangdetail.findOne({
      include: { all: true, nested: true },
      where: {
        id
      }
    })

    const dataKeranjang = await keranjang.findOne({
      include: { all: true, nested: true },
      where: {
        id: dataKeranjangDetail.keranjang_id
      }
    })

    // TODO: Validasi apakah id ada
    if (dataKeranjangDetail === null) {
      res.status(404).json({
        message: `Data tidak ditemukan`
      })
    }

    await keranjangdetail.destroy({
      where: {
        id
      }
    })

    await keranjang.update({
      total: dataKeranjang.total - (dataKeranjangDetail.jumlah * dataKeranjangDetail.product.harga)
    },
      {
        where: {
          id: dataKeranjangDetail.keranjang_id
        }
      })

    res.status(200).json({
      message: `Data telah berhasil dihapus`
    })
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message
    })
  }
}

module.exports = {
  getKeranjangdetail,
  getIdKeranjangdetail,
  postKeranjangdetail,
  updateKeranjangdetail,
  deleteKeranjangdetail,
  postsKeranjangdetail,
  kurangKeranjangdetail,
  tambahKeranjangdetail
}