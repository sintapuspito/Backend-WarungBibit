require("dotenv").config();
const bcrypt = require('bcrypt')
const Joi = require('joi')
const jwt = require('jsonwebtoken')
const { user } = require('../models')

const getUsers = async (req, res) => {
  const data = await user.findAll({
    include: { all: true, nested: true }
  })

  try {
    if (data.length) {
      return res.status(200).json({
        data: data
      })
    } else {
      return res.status(500).json({
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

const getIdEmail = async (req, res) => {
  try {
    // const { name, price, stock } = req.body
    const email = req.query.email

    const data = await user.findOne({
      where: {
        email
      }
    }, {
      include: { all: true, nested: true }
    })

    if (data !== null) {
      res.status(200).json({
        data: data
      })
    } else {
      res.status(500).json({
        status: 'failed',
        message: `Data tidak ditemukan`
      })
    }
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message
    })
  }
}

const getIdUser = async (req, res) => {
  try {
    // const { name, price, stock } = req.body
    const id = req.params.id
    const data = await user.findByPk(id, {
      include: { all: true, nested: true }
    })

    // TODO: Validasi apakah id ada
    if (data !== null) {
      res.status(200).json({
        status: 'success',
        data
      })
    } else {
      res.status(500).json({
        status: 'failed',
        message: `Data tidak ditemukan`
      })
    }
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message
    })
  }
}

const postUser = async (req, res) => {
  const schema = Joi.object({
    name: Joi.string().min(2).required().label("name"),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com'] } }).required().label("email"),
    password: Joi.string().pattern(/^(?=.*[a-z]).{8,}$/, "password").required(),
    role: Joi.valid("admin", "user")
  })

  const val = schema.validate(req.body)

  if (!(val.error)) {
    try {
      const { email, password, role, ...rest } = val.value

      const hashPassword = bcrypt.hashSync(password, 10)

      // TODO: email sudah ada
      const Email = await user.findOne({
        where: {
          email
        }
      })

      if (Email !== null) {
        return res.status(500).json({
          status: 'failed',
          message: `Email sudah dipakai`
        })
      }
      // minimal password

      const data = await user.create({
        email,
        ...rest,
        password: hashPassword,
        role: role ? role : 'user'
      })

      res.status(201).json({
        message: `Anda berhasil register`,
      })


    } catch (error) {
      res.status(400).json({
        status: "failed",
        message: error.message
      })
    }
  } else {
    const message = val.error.details[0].message
    res.status(400).json({
      status: "failed",
      message
    })
  }
}



const updateUser = async (req, res) => {
  const id = req.params.id

  const dataId = await user.findByPk(id)

  // TODO: Validasi apakah id ada
  if (dataId === null) {
    res.status(500).json({
      status: 'failed',
      message: `Data tidak ditemukan`
    })
  }

  const schema = Joi.object({
    name: Joi.string().min(2).required().label("Full Name"),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com'] } }).required().label("email"),
    role: Joi.valid("admin", "user")
  })

  const val = schema.validate(req.body)

  if (!(val.error)) {
    try {
      const { email, ...rest } = val.value

      const Email = await user.findOne({
        where: {
          email
        }
      })

      // TODO: Validasi apakah email sudah ada
      if (Email !== null && Email.dataValues.id !== Number(id)) {
        return res.status(400).json({
          status: 'failed',
          message: `Email sudah terpakai`
        })
      }

      await user.update({
        email,
        ...rest
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
        status: 'success',
        message: err.message
      })
    }
  } else {
    const message = val.error.details[0].message
    res.status(400).json({
      status: "failed",
      message
    })
  }
}

const deleteUser = async (req, res) => {
  try {
    const id = req.params.id

    const dataId = user.findByPk(id)

    // TODO: Validasi apakah id ada
    if (dataId === null) {
      res.status(500).json({
        status: 'failed',
        message: `Data tidak ditemukan`
      })
    }

    await user.destroy({
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

const login = async (req, res) => {
  try {
    const { email, password } = req.body

    const users = await user.findOne({
      where: {
        email
      }
    })

    if (!users) {
      return res.status(500).json({
        status: 'failed',
        message: `Data dengan email tidak ditemukan`
      })
    }

    if (users && bcrypt.compareSync(password, users.password)) {
      const token = jwt.sign({
        id: users.id,
        email: users.email,
        role: users.role,
        nama: users.name
      }, process.env.JWT_SIGNATURE_KEY)

      res.status(200).json({
        message: `Anda berhasil login`,
        token: token
      })
    } else {
      res.status(409).json({
        message: `Periksa kembali email dan password anda`
      })
    }

  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error.message
    })
  }
}

module.exports = {
  getUsers,
  getIdUser,
  postUser,
  updateUser,
  deleteUser,
  login,
  getIdEmail,
}