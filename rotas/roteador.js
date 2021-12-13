const roteador = require('express').Router()
const intencao = require('../dialogflow/intencoes')


roteador.post('', intencao.bot)

module.exports = roteador