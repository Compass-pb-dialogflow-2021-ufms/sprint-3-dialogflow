const { WebhookClient } = require('dialogflow-fulfillment')

const defaultWelcomeIntent = (agent) => {
    const texto =     'Olá! Seja bem-vindo(a) a Pizzaria Tre Fratelli.\n'
                    + 'Gostaria de fazer um pedido ou dar uma olhada no nosso cardápio ?'

    agent.add(texto)
}

const verCardapioIntent = (agent) => {
    const texto = 'Texto da Intent ver cardapio.'

    agent.add(texto)
}

const fazerPedidoIntent = (agent) => {
    const texto = 'Texto da Intent fazer pedido.'

    agent.add(texto)
}

const fazerPagamentoIntent = (agent) => {
    const texto = 'Texto da Intent fazer pagamento.'

    agent.add(texto)
}

const finalizarPedidoIntent = (agent) => {
    const texto = 'Texto da Intent finalizar pedido.'

    agent.add(texto)
}

const main = (req, res) => {
    const agent = new WebhookClient({ request: req, response: res })

    let intentMap = new Map()
    intentMap.set('Default Welcome Intent', defaultWelcomeIntent)
    intentMap.set('Ver Cardapio Intent', verCardapioIntent)
    intentMap.set('Fazer Pedido Intent', fazerPedidoIntent)
    intentMap.set('Fazer Pagamento Intent', fazerPagamentoIntent)
    intentMap.set('Finalizar Pedido Intent', finalizarPedidoIntent)

    agent.handleRequest(intentMap)
}

module.exports = {
    main
}