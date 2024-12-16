const express = require('express')
const { getAdmin, loginAdmin, createAdmin } = require("../Controlers/admin")

const admin_router = express.Router()

admin_router.get('/get', getAdmin)
admin_router.post('/register', createAdmin)
admin_router.post('/login', loginAdmin)

module.exports = { admin_router };