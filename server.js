const express = require('express');
const app = express();
const dialogflowFulfilment = require('dialogflow-fulfillment');
const bodyParser = require("body-parser");
const intents = require('./intents');

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send("Servidor rodando")
});

app.post('/', (req, res) => {
    const agent = new dialogflowFulfilment.WebhookClient({
        request: req,
        response: res
    });

    var intentMap = new Map();

    intentMap.set('Funcionamento', intents.Funcionamento)
    intentMap.set('SolicitarMenu', intents.SolicitarMenu)
    intentMap.set('InformarPedido', intents.InformarPedido);
    intentMap.set('InformarPedido - yes', intents.InformarBebida);
    intentMap.set('InformarPedido - yes - yes', intents.FinalizarPedido);
    intentMap.set('InformarPedido - no', intents.FinalizarPedido);
    intentMap.set('InformarPedido - yes - yes - InformarPagamento', intents.InformarPagamento);

    agent.handleRequest(intentMap);
});

app.listen(process.env.PORT || 3000, () => {
    console.log('Rodando em http://localhost:3000')
})