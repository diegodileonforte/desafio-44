const mongoose = require('mongoose')
const Schema = mongoose.Schema

const mensajeSchema = new Schema({

    author: {
        email: { type: String },
        nombre: { type: String },
        apellido: { type: String },
        edad: { type: Number },
        alias: { type: String },
        avatar: { type: String },
    },
    text: { type: String }


})

const MensajeModel = mongoose.model('MensajeModel', mensajeSchema)
module.exports =  MensajeModel