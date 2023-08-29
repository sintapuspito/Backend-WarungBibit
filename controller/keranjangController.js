const { keranjang } = require('../models')
const { user } = require('../models')
const getKeranjang = async (req, res) => {
  data = await keranjang.findAll({
    order: [["id", "Asc"]]
  })

  try {
    if (data.length) {
      return res.status(200).json({
        data: data
      })
    } else {
      return res.status(200).json({
        status: "Data tidak ada",
      })
    }

  } catch (error) {
    res.status(400).json({
      message: error.message
    })
  }
}

const getUserIdKeranjang = async (req, res) => {
  try {
    let userid = req.body.user_id
    const data = await keranjang.findOrCreate({
      where: {
        user_id : userid
      },
      include: { all: true, nested: true },
    })

    res.status(200).json({
      data : data
    })
  } catch (err) {
    res.status(400).json({
      message: err.message
    })
  }
}


const getIdKeranjang = async (req, res) => {
  try {
    const id = req.params.id
    const data = await keranjang.findOne(
      {
        where:{ 
          id: id
        },
        include: { all: true, nested: true },
      }
    )

    // TODO: Validasi apakah id ada
    if (data === null) {
      return res.status(404).json({
        message: `Data tidak ditemukan`
      })
    }

    return res.status(200).json({
      data : data
    })
  } catch (err) {
    return res.status(400).json({
      message: err.message
    })
  }
}

const postKeranjang = async (req, res) => {
  try {
    const datas = req.body
    const dataId = await user.findByPk(datas.user_id)

    // TODO: Validasi apakah id ada
    if (dataId) {
      return res.status(201).json({
        message : "Keranjang Sudah Ada"
      })
    }
    const data = await keranjang.create({
      ...datas
    })

    return res.status(201).json({
      message : "Data berhasil ditambahkan"
    })
  } catch (error) {
    return res.status(400).json({
      status: "failed",
      message: error.message
    })
  }
}

const updateKeranjang = async (req, res) => {
  try {
    const { ...rest } = req.body
    const id = req.params.id

    const dataId = await keranjang.findByPk(id)

    // TODO: Validasi apakah id ada
    if (dataId === null) {
      res.status(404).json({
        message: `Data tidak ditemukan`
      })
    }

    
    await keranjang.update({
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
      message: err.message
    })
  }
}

const deleteKeranjang = async (req, res) => {
  try {
    const id = req.params.id

    const dataId = await keranjang.findByPk(id)

    // TODO: Validasi apakah id ada
    if (dataId === null) {
      res.status(404).json({
        status: 'failed',
        message: `Data tidak ditemukan`
      })
    }

    await keranjang.destroy({
      where: {
        id
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
  getKeranjang,
  getIdKeranjang,
  postKeranjang,
  updateKeranjang,
  deleteKeranjang,
  getUserIdKeranjang
}