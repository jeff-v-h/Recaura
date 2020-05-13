const cors = require('cors')
const keys = require('./keys')

const whitelist = keys.ALLOWED_ORIGINS.split(";")
const corsOptions = {
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

// If API_URL environment variable is left blank, do not add specific cors function (i.e allow all websites)
if (whitelist[0].length > 0) {
    corsOptions.origin = function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}

const appCors = cors(corsOptions)

module.exports = appCors;