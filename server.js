const express = require('express')
const bodyParser = require("body-parser")
const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.json())

const rotaPizzaria = require('./rotas/pizzaria')
app.use('/pizzariabot', rotaPizzaria)

app.listen(3000, () => console.log("A api tá on!"))