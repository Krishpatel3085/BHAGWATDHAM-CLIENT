const express = require('express');
const { CreateMarksheet, GetAllMarksheets, UpdateMarksheet, DeleteMarksheet, GetMarksheetById } = require('../Controller/marksheet');
const { authenticateToken } = require('../Middleware/authToken');

const marksheet_router = express.Router()

marksheet_router.post('/CreateMarksheet',authenticateToken, CreateMarksheet);
marksheet_router.get('/GetMarksheets', GetAllMarksheets);
marksheet_router.get('/GetMarksheetsid/:id', GetMarksheetById);
marksheet_router.put('/UpdateMarksheet/:id', UpdateMarksheet);
marksheet_router.delete('/DeleteMarksheet/:id', DeleteMarksheet);

module.exports = { marksheet_router }


