const express = require('express');
const app = express();
const router = require('./Rotas/rotaPizzaria');
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.listen(port, () => console.log("Servidor rodando"));

app.use('/pizzaria',router);

