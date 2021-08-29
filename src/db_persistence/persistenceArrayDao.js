const logger = require("../helpers/winston.js")
const DatabaseProductoDao = require("../DAO/DatabaseProductoDao.js")
const productoDto = require ("../DTO/productoDto.js")
let productosArray = []

class ArrayDb extends DatabaseProductoDao {
  constructor() {
    super()
    this.msg = console.log("Base de Datos Array")
  }

  async addPersistenceProducto(dataToDb) {
    try {
      let newProducto = await { ...dataToDb }
      newProducto._id = productosArray.length + 1
      productosArray.push(newProducto)
    } catch (error) {
      logger.error.error(error)
    }
  }

  async findAllPersistenceProducto() {
    try {
      return productosArray;
    } catch (error) {
      logger.error.error(error)
    }
  }

  async findByIDPersistenceProducto(_id) {
    try {
      let prodById = await productosArray.find(
        (prod) => prod._id == parseInt(_id)
      );
      const myDto = productoDto(prodById)
      return myDto;
    } catch (error) {
      logger.error.error(error)
    }
  }

  async deletePersistenceProducto(_id) {
    try {
      const i = productosArray.findIndex((prod) => prod._id == parseInt(_id))
      if (i !== -1) {
        let prodDrop = productosArray.splice(i, 1)
        return prodDrop
      }
    } catch (error) {
      logger.error.error(error)
    }
  }

  async updatePersistenceProducto(_id, data) {
    try {
      const newProd = { _id, ...data }
      console.log(newProd)
      const index = productosArray.findIndex((p) => p._id == _id)
      console.log(index)
      if (index !== -1) {
        productosArray.splice(index, 1, newProd)
        return newProd;
      }
    } catch (error) {
      logger.error.error(error)
    }
  }
}

module.exports = ArrayDb