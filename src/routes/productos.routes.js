const express = require ('express')
const Producto = require ('../controllers/Producto.js')
const validate = require ('../middlewares/auth.js')
const router = express.Router()
const nuevoProducto = new Producto()


/* router.post('/', nuevoProducto.add)
router.get('/', nuevoProducto.findAll) */
router.get('/:id', nuevoProducto.findByID)
router.delete('/:id', nuevoProducto.deleteProd)
router.put('/:id', nuevoProducto.update)

module.exports = router