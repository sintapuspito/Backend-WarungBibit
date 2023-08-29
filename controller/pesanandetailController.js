const { pesanandetail } = require('../models')

const getPesanandetail = async (req, res) => {
  data = await pesanandetail.findAll({
    order: [["id", "Asc"]]
  })

  try {
    if (data.length) {
      return res.status(200).json({
        data: data
      })
    } else {
      return res.status(200).json({
        status: "Data tidak ada"
      })
    }

  } catch (error) {
    res.status(400).json({
      status: "success",
      message: error.message
    })
  }
}

const getIdPesanandetail = async (req, res) => {
  try {
    const id = req.params.id
    const data = await pesanandetail.findByPk(id)

    // TODO: Validasi apakah id ada
    if (data === null) {
      return res.status(404).json({
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

const postPesanandetail = async (req, res) => {
  try {
    const datas = req.body

    const data = await pesanandetail.create({
      ...datas
    })

    res.status(201).json({
      message: "Data Berhasil Ditambahkan"
    })
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error.message
    })
  }
}

const updatePesanandetail = async (req, res) => {
  try {
    const { ...rest } = req.body
    const id = req.params.id

    const dataId = await pesanandetail.findByPk(id)

    // TODO: Validasi apakah id ada
    if (dataId === null) {
      res.status(404).json({
        status: 'failed',
        message: `Data tidak ditemukan`
      })
    }


    await pesanandetail.update({
      ...rest
    }, {
      where: {
        id
      }
    })
    res.status(200).json({
      status: 'success',
      message: `Data berhasil diupdate`
    })
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message
    })
  }
}

const deletePesanandetail = async (req, res) => {
  try {
    const id = req.params.id

    const dataId = await pesanandetail.findByPk(id)

    // TODO: Validasi apakah id ada
    if (dataId === null) {
      res.status(404).json({
        status: 'failed',
        message: `Data tidak ditemukan`
      })
    }

    await pesanandetail.destroy({
      where: {
        id
      }
    })

    res.status(200).json({
      status: 'success',
      message: `Data berhasil terhapus`
    })
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message
    })
  }
}

module.exports = {
  getPesanandetail,
  getIdPesanandetail,
  postPesanandetail,
  updatePesanandetail,
  deletePesanandetail
}