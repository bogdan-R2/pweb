const express = require("express");

const router = express.Router()

require('./routes/requests')(router)
require('./routes/user')(router)
require('./routes/camps')(router)


//export default router

module.exports = router