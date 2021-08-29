const logger = require("../helpers/winston.js")
const MongoDb = require("../db_persistence/persistenceMongoDao.js")
const FsDb = require("../db_persistence/persistenceFsDao.js")
const ArrayDb = require("../db_persistence/persistenceArrayDao.js")
const MysqlDb = require("../db_persistence/persistenceMysqlDao.js")
const database = ""

class FactoryProducto {
  constructor(number) {
    this.database = database
    switch (number) {
      case 1:
        this.database = new MongoDb()
        break;
      case 2:
        this.database = new FsDb()
        break;
      case 3:
        this.database = new MysqlDb()
        break;
      default:
        this.database = new ArrayDb()
        break;
    }
  }

  async addServiceProducto(data) {
    try {
      const dataToDb = {
        title: data.title,
        price: data.price,
        thumbnail: data.thumbnail,
      };
      const prod = await this.database.addPersistenceProducto(dataToDb)
      return prod
    } catch (error) {
      logger.error.error(error)
    }
  }

  async findAllServiceProducto() {
    try {
      const prodInDb = await this.database.findAllPersistenceProducto()
      return prodInDb;
    } catch (error) {
      logger.error.error(error)
    }
  }

  async findByIDServiceProducto(_id) {
    try {
      const prodById = await this.database.findByIDPersistenceProducto(_id)
      return prodById
    } catch (error) {
      logger.error.error(error)
    }
  }

  async deleteServiceProducto(_id) {
    try {
      const prodToDel = await this.database.deletePersistenceProducto(_id)
      return prodToDel
    } catch (error) {
      logger.error.error(error)
    }
  }

  async updateServiceProducto(_id, data) {
    try {
      const prodUpdated = await this.database.updatePersistenceProducto(
        _id,
        data
      );
      return prodUpdated
    } catch (error) {
      logger.error.error(error)
    }
  }
}

module.exports = FactoryProducto