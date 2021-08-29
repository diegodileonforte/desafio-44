const express = require ('express')
const validate = require ('../middlewares/auth.js')
const Info = require ('../controllers/Info.js')
const infoRouter = express.Router()
const info = new Info()

infoRouter.get('/', validate, info.getInfo )

module.exports = infoRouter