const FactoryProducto = require("../factory/factoryProducto.service.js")
const logger = require("../helpers/winston.js")
const config = require('../config/index.js')

const factory = new FactoryProducto(parseInt(config.DATABASE))

class Producto {
  async add(req, res) {
    try {
      if (!req) {
        return res
          .status(404)
          .json({ mensaje: "Error al agregar un producto" })
      }
      const data = { ...(await req.body) }
      factory.addServiceProducto(data)
      return res.status(200).json("Producto agregado correctamente")
    } catch (error) {
      logger.error.error(error)
    }
  }

  async findAll(req, res) {
    try {
      const prodInDb = await factory.findAllServiceProducto()
      if (!prodInDb) { res.status(404).send({ mensaje: 'No hay producto' }) }
      return res.status(200).json(prodInDb)
    } catch (error) {
      logger.error.error(error)
    }
  }

  async findByID(req, res) {
    const _id = req.params.id
    try {
      if (_id === "") {
        return res
          .status(404)
          .json({ mensaje: "Producto no encontrado", error })
      }
      const prodById = await factory.findByIDServiceProducto(_id)
      if (!prodById) {
        return res.status(404).json({ mensaje: "No se encontró el producto" })
      }
      return res.status(200).json(prodById)
    } catch (error) {
      logger.error.error(error)
    }
  }

  async deleteProd(req, res) {
    const _id = req.params.id
    try {
      if (_id === "") {
        return res.status(404).json({ mensaje: "No se declaró ID de producto" })
      }
      const prodToDel = await factory.deleteServiceProducto(_id)
      if (!prodToDel) {
        return res.status(404).json({ mensaje: "Producto no encontrado" })
      }
      return res.status(200).json({ mensaje: "Producto eliminado con éxito" })
    } catch (error) {
      logger.error.error(error)
    }
  }

  async update(req, res) {
    const _id = req.params.id
    const data = { ...req.body }
    try {
      const prodUpdated = await factory.updateServiceProducto(_id, data)
      return res
        .status(200)
        .json({ prodUpdated, mensaje: "Producto actualizado correctamente" })
    } catch (error) {
      logger.error.error(error)
    }
  }
}

module.exports = Producto
