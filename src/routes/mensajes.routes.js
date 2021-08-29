const express = require ('express')
const Mensaje = require ('../controllers/Mensaje.js')
const validate = require ('../middlewares/auth.js')
const routerMsg = express.Router()
const msg = new Mensaje()

routerMsg.post('/', msg.addMsg)
routerMsg.get('/', msg.findAllMsg)
routerMsg.get('/norm', msg.normalizedData)

module.exports = routerMsg