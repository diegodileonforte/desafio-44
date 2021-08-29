const DatabaseProductoDao = require("../DAO/DatabaseProductoDao.js")
const fs = require("fs")
const logger = require("../helpers/winston.js")
const path = require("path")
const _dirname = path.resolve(__dirname)
const productoDto = require ("../DTO/productoDto.js")
let producto = []

class FsDb extends DatabaseProductoDao {
  constructor() {
    super()
    this.createJson = this.readJson
    this.msg = console.log("Base de Datos FS")
  }

  readJson() {
    if (!fs.existsSync(_dirname + "/files/productos.json")) {
      fs.writeFileSync(
        _dirname + "/files/productos.json",
        JSON.stringify(producto)
      );
    } else {
      let data = fs.readFileSync(_dirname + "/files/productos.json")
      return JSON.parse(data)
    }
  }

  saveJson(data) {
    let stringifyData = JSON.stringify(data)
    fs.writeFileSync(_dirname + "/files/productos.json", stringifyData)
  }

  async addPersistenceProducto(dataToDb) {
    try {
      const _id = producto.length + 1
      let newProd = { ...dataToDb, _id }
      producto.push(await newProd)
      this.saveJson(producto)
    } catch (error) {
      logger.error.error(error)
    }
  }

  async findAllPersistenceProducto() {
    try {
      const allProd = await this.readJson()
      return allProd
    } catch (error) {
      logger.error.error(error)
    }
  }

  async findByIDPersistenceProducto(_id) {
    try {
      const prodById = await this.readJson()
      let prodFiltro = await prodById.find((prod) => prod._id == parseInt(_id))
      const myDto = productoDto(prodFiltro)
      return myDto
    } catch (error) {
      logger.error.error(error)
    }
  }

  async deletePersistenceProducto(_id) {
    try {
      let viewProdDrop = await this.readJson()
      let prodDrop = await viewProdDrop.filter(
        (prod) => prod._id !== parseInt(_id)
      );
      this.saveJson(prodDrop)
      producto.push(prodDrop)
      return prodDrop
    } catch (error) {
      logger.error.error(error)
    }
  }

  async updatePersistenceProducto(_id, data) {
    try {
      console.log('DATA',data)
      let viewProdUpdate = await this.readJson()
      console.log('JSON',viewProdUpdate)
      console.log('ID',_id)
      viewProdUpdate = await viewProdUpdate.map((prod) => {
        if (prod._id == parseInt(_id)) {
          prod.title = data.title
          prod.price = data.price
          prod.thumbnail = data.thumbnail
        }
        this.saveJson(viewProdUpdate)
        producto.push(viewProdUpdate)
        res.status(200).json(viewProdUpdate)
      })
    } catch (error) {
      logger.error.error(error)
    }
  }
}

module.exports = FsDb