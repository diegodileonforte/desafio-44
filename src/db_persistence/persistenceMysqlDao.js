const DatabaseProductoDao = require("../DAO/DatabaseProductoDao.js")
const MysqlCxn = require("../database/MysqlCxn.js")
const logger = require("../helpers/winston.js")
const mysql = require("../config/mysql.js")
const knexFn = require("knex")
const productoDto = require ("../DTO/productoDto.js")

class MysqlDb extends DatabaseProductoDao {
  constructor() {
    super()
    this.cxn = new MysqlCxn(mysql)
    this.knex = knexFn(mysql)
    this.msg = console.log("Base de Datos Mysql")
  }

  async addPersistenceProducto(dataToDb) {
    try {
      const nvoProd = await this.knex("productos").insert({
        title: dataToDb.title,
        price: dataToDb.price,
        thumbnail: dataToDb.thumbnail,
      });
      return nvoProd
    } catch (error) {
      logger.error.error(error)
    }
  }

  async findAllPersistenceProducto() {
    try {
      const productos = await this.knex("productos").select()
      return productos
    } catch (error) {
      logger.error.error(error)
    }
  }

  async findByIDPersistenceProducto(_id) {
    try {
      const prodId = await this.knex("productos").select().where("_id", _id)
      const myDto = productoDto(prodId)
      return myDto
    } catch (error) {
      logger.error.error(error)
    }
  }

  async deletePersistenceProducto(_id) {
    try {
      return await this.knex("productos").select().where("_id", _id).del()
    } catch (error) {
      logger.error.error(error)
    }
  }

  async updatePersistenceProducto(_id, data) {
    try {
      const prodUpdate = await this.knex("productos").where("_id", _id).update({
        title: data.title,
        price: data.price,
        thumbnail: data.thumbnail,
      })
      return prodUpdate
    } catch (error) {
      logger.error.error(error)
    }
  }
}

module.exports = MysqlDb