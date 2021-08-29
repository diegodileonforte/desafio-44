const {mainGetService, logoutService} = require('../service/users.service.js')
const logger = require('../helpers/winston.js')

class User {
    async registerGet(req, res) {
        res.render('register')
    }

    async loginGet(req, res) {
        res.render('login')
    }

    async mainGet(req, res) {
        try {
            const userInfo = { ... await req.user }
            mainGetService(userInfo)
            res.render('main')
        } catch (error) {
            logger.error.error(error)
        }
    }

    async logout(req, res) {
        try {
            logoutService()
            req.logout();
            res.redirect('/user/login')
        } catch (error) {
            logger.error.error(error)
        }
    }
}

module.exports = User

