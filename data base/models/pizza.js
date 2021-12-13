const mongoose = require('mongoose')


const Pizza = mongoose.model('Pizza', {
    nome: String,
    ingredientes: String,
    tamBroto: Number,
    tamMedio: Number,
    tamGrande: Number,
    tamFamilia: Number
})


module.exports = Pizza