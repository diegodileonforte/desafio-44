const config = require('../config/index.js')
const mongoose = require("mongoose")

const MONGODB_URI = config.MONGODB_URI

class MongoCxn {
    constructor() {
        if (MongoCxn.instancia) {
            return MongoCxn.instancia
        }

        this.connection = this.createConnection()
        MongoCxn.instancia = this
    }

    createConnection() {
        const uri = MONGODB_URI
            
        const options = {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
        };
        mongoose.connect(uri, options).then(
            () => {},
            (err) => {
                err
            }
        )
    }
}

module.exports = MongoCxn