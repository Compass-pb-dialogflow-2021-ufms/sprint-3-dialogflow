const mongoose = require('mongoose')


const Bebida = mongoose.model('Bebida', {
    nome: String,
    valor: Number
})


module.exports = Bebida