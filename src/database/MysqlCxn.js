const knexFn = require("knex")

class MysqlCxn {
  constructor(config) {
    if (MysqlCxn.instancia) {
      return MysqlCxn.instancia
    }

    this.createTable = this.createTableProd(config)
    MysqlCxn.instancia = this
  }

  async createTableProd (config) {
    try {
      const knex = knexFn(config)

      await knex.schema.hasTable("productos")
      return await knex.schema.createTableIfNotExists("productos", (table) => {
        table.increments("_id").primary()
        table.string("title", 50).notNullable()
        table.integer("price").notNullable()
        table.string("thumbnail", 150).notNullable()
      });
    } catch (error) {
      console.error(error)
    }
  }
}

module.exports = MysqlCxn