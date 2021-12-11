const express = require('express')
const roteador = express.Router()

roteador.post('/', function(req, res){
    var intentName = req.body.queryResult.intent.displayName;
    
    switch(intentName){
        case "Pizzas":
            res.json({ "fulfillmentText": "Estes são nossos sabores de pizza salgada:" + "\n" + "4 queijos(R$30,00), camarão(R$34,00), calabresa(R$28,00), atum(R$29,00), frango(R$32,00)" + "\n" + "e Doces:" + "\n" + "brigadeiro(R$25,00), banana(R$22,00), doce de leite(R$27,00)."});
            break;
        case "Bebidas":
            res.json({ "fulfillmentText": "Essas são nossas bebidas: refrigerante(R$5,00), suco(R$4,00), água(R$2,00), água de coco(R$4,00)."});
            break;
        case "Sabores":
            var sabor = req.body.queryResult.parameters["sabor"];
            var tamanho = req.body.queryResult.parameters["tamanhoPizza"];
            var borda = req.body.queryResult.parameters["bordas"];
            var valor;
            switchSabor(sabor);
            res.json({ "fulfillmentText": "Anotado! Uma pizza sabor" + "\n" + sabor + ", tamanho: "+ "\n" + tamanho + "\n" + borda + "\n" + "no valor de:" + "\n" + "R$" + valor + ",00"+". Qual a forma de pagamento?"});
            break;
        case "tipoBebidas":
            var bebida = req.body.queryResult.parameters["tipoBebidas"];
            var valorBebida;
            switchBebida(bebida);
            res.json({ "fulfillmentText": "Anotado! Um(a)" + "\n" + bebida + " valor: " + "R$"+ valorBebida+",00" +". Qual a forma de pagamento?"});
            break;
    }

    function switchBebida(bebida){
        switch (bebida) {
            case 'refrigerante':
              valorBebida = 5;
              break;
            case 'suco':
              valorBebida = 4;
              break;
            case 'água':
              valorBebida = 2;
              break;
            case 'água de coco':
              valorBebida = 4;
              break;
            default:
              valorBebida = 0;
        }
    }

    function switchSabor(sabor){
        switch (sabor) {
            case '4 queijos':
              valor = 30;
              break;
            case 'camarão':
              valor = 34;
              break;
            case 'calabresa':
              valor = 28;
              break;
            case 'atum':
              valor = 29;
              break;
            case 'frango':
              valor = 32;
              break;
            case 'brigadeiro':
              valor = 25;
              break;
            case 'banana':
              valor = 22;
              break;
            case 'doce de leite':
              valor = 27;
              break;
            default:
              valor = 0;
        }
      }

  })

  module.exports = roteador