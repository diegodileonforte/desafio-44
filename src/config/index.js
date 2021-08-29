const dotenv = require("dotenv")
const path = require("path")

dotenv.config({
  path: path.resolve(__dirname + '/' + process.argv[2] + ".env"),
})

module.exports = {
  NODE_ENV: process.env.NODE_ENV || "development",
  FACEBOOK_CLIENT_ID: process.env.FACEBOOK_CLIENT_ID,
  FACEBOOK_CLIENT_SECRET: process.env.FACEBOOK_CLIENT_SECRET,
  MONGODB_URI: process.env.MONGODB_URI,
  CEL_PHONE_NUMBER: process.env.CEL_PHONE_NUMBER,
  DATABASE: process.env.DATABASE
}

