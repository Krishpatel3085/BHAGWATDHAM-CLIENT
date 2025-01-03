const express = require('express')
const { createAdmin, getAdmin, loginAdmin, updateUserStatus } = require("../Controller/admin")

const admin_router = express.Router()

admin_router.get('/get', getAdmin)
admin_router.post('/register', createAdmin)
admin_router.post('/login', loginAdmin)
admin_router.put('/request', updateUserStatus)

module.exports = { admin_router };