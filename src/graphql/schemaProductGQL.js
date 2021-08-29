const { buildSchema } = require("graphql")
const FactoryProducto = require("../factory/factoryProducto.service.js")
const config = require("../config/index.js")
const logger = require("../helpers/winston.js")
const factory = new FactoryProducto(parseInt(config.DATABASE))

const schemaProductGQL = buildSchema(`
  
  type Product {
    _id: String,
    title: String,
    price: Int,
    thumbnail: String
  },
  type Query {
    getProducts: [Product],
    getById(_id: String): Product
  },
  type Mutation {
    createProduct(
      title: String!,
      price: Int!,
      thumbnail: String): Product
  }
`);

const rootProductGQL = {
  getProducts: getProducts,
  createProduct: createProduct,
  getById: getById,
};

async function getProducts() {
  try {
    const prodInDb = await factory.findAllServiceProducto()
    return prodInDb
  } catch (error) {
    logger.error.error(error)
  }
}

async function createProduct({ title, price, thumbnail }) {
  try {
    const data = { title, price, thumbnail }
    const newProd = await factory.addServiceProducto(data)
    return await newProd;
  } catch (error) {
    logger.error.error(error)
  }
}

async function getById(_id) {
  try {
    const {title, price, thumbnail} = await factory.findByIDServiceProducto(_id)
    return {title, price, thumbnail}
  } catch (error) {
    logger.error.error(error)
  }
}

module.exports = { schemaProductGQL, rootProductGQL }