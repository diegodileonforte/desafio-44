const productoDto = (producto) => {
  return myDto = {
    fyh: new Date().toLocaleString(),
    producto: producto.title,
    precio: producto.price,
    imagen: producto.thumbnail,
  }
}

module.exports = productoDto