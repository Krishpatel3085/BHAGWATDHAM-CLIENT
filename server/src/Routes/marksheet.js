const express = require('express');
const { CreateMarksheet, GetAllMarksheets, UpdateMarksheet, DeleteMarksheet } = require('../Controller/marksheet');

const marksheet_router = express.Router()

marksheet_router.post('/CreateMarksheet', CreateMarksheet);
marksheet_router.get('/GetMarksheets', GetAllMarksheets);
marksheet_router.put('/UpdateMarksheet/:id', UpdateMarksheet);
marksheet_router.delete('/DeleteMarksheet', DeleteMarksheet);

module.exports = { marksheet_router }


