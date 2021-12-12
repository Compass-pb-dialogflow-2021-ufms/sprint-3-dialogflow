require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// Importando rotas.
const raiz = require('./routes/index')

// Rotas.
app.use('/', raiz)

const port = process.env.PORT
app.listen(port, () => {
    console.log(`Serviço rodando na porta ${port}.`)
})