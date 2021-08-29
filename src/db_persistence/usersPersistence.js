userInfo = []

const logger = require("../helpers/winston.js")

async function mainGetPersistance(userName, photo) {
  try {
    userInfo.push(await userName, photo)
  } catch (error) {
    logger.error.error(error)
  }
}

async function logoutPersistence() {
  try {
    return userInfo
  } catch (error) {
    logger.error.error(error)
  }
}

module.exports = { mainGetPersistance, logoutPersistence }