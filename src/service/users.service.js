const { mainGetPersistance, logoutPersistence } = require('../db_persistence/usersPersistence.js')
/* const mail = require('../helpers/nodemailer.js') */
const logger = require('../helpers/winston.js')

async function mainGetService(userInfo) {
    try {
        const photo = await userInfo.photos[0].value
        const userName = await userInfo.displayName
        /* const time = Date();

        const email = 'nikolas.mccullough70@ethereal.email'
        const subjet = `User Login at ${time} / User: ${userName}`
        const html =
            `<p>The user ${userName} has logged in</p>
        <img src="${photo}" alt="userImg" />`

        mail(email, subjet, html) */
        mainGetPersistance(userName, photo)
    } catch (error) {
        logger.error.error(error)
    }
}

async function logoutService() {
    try {
        const user = await logoutPersistence()
        
        /* const time = Date();
        const email = 'nikolas.mccullough70@ethereal.email'
        const subjet = `User Logout at ${time} / User: ${user[0]} `
        const html =
            `<p>The user ${user[0]} has logged out</p >
        <img src="${user[1]}" alt="userImg" />`

        mail(email, subjet, html) */
    } catch (error) {
        logger.error.error(error)
    }
}

module.exports = { mainGetService, logoutService }