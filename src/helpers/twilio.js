const twilio = require('twilio');
const config = require('../config/index.js');
const CEL_PHONE_NUMBER = config.CEL_PHONE_NUMBER;

const acctSid = 'ACde66b06cbb4770cc3d69379d6c1aa6ff'
const authToken = 'd97e1b12f0048182258fe872a5c7c702'

const twilioClient = twilio(acctSid, authToken)

const from = '+14159415942'
const to = CEL_PHONE_NUMBER
const body = ''

async function twilioSms(body) {
    try {
        await twilioClient.messages.create({ body, from, to })
    }
    catch (error) {
        console.log(error)
    }
}


module.exports = {twilioSms}

