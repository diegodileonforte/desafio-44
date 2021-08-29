const BaseMensaje = require ('../repository/mensaje.repository.js')
const MensajeModel = require('../models/mensajeSchema.js')
const logger = require('../helpers/winston.js')

class MensajePersistence extends BaseMensaje {

    async normalizedDataPersistence() {
        try {
            const mensajes = await MensajeModel.find()
            return mensajes
        } catch (error) {
            logger.error.error(error)
        }
    }
}

module.exports = MensajePersistence
