const { WebhookClient, Image } = require('dialogflow-fulfillment')

const cardapio = {
      quatroqueijos_broto: 20
    , quatroqueijos_media: 35
    , quatroqueijos_grande: 48
    , quatroqueijos_familia: 55
    , camarao_broto: 25
    , camarao_media: 38
    , camarao_grande: 52
    , camarao_familia: 58
    , calabresa_broto: 18
    , calabresa_media: 30
    , calabresa_grande: 42
    , calabresa_familia: 50
    , atum_broto: 23
    , atum_media: 32
    , atum_grande: 45
    , atum_familia: 53
    , frango_broto: 18
    , frango_media: 30
    , frango_grande: 42
    , frango_familia: 50
    , brigadeiro_broto: 20
    , brigadeiro_media: 35
    , brigadeiro_grande: 48
    , brigadeiro_familia: 55
    , banana_broto: 18
    , banana_media: 30
    , banana_grande: 42
    , banana_familia: 50
    , doceDeLeite_broto: 23
    , doceDeLeite_media: 32
    , doceDeLeite_grande: 45
    , doceDeLeite_familia: 53
    , refrigerante: 11
    , suco: 8
    , agua: 5
    , aguaDeCoco: 11
}

let preco

const setPreco = (parametros) => {
    switch (parametros.sabor){
        case '4 queijos':
            switch (parametros.tamanho) {
                case 'broto':
                    preco = cardapio.quatroqueijos_broto
                    break
                case 'média':
                    preco = cardapio.quatroqueijos_media
                    break
                case 'grande':
                    preco = cardapio.quatroqueijos_grande
                    break
                case 'família':
                    preco = cardapio.quatroqueijos_familia
                    break
            }
            break
        case 'camarão':
            switch (parametros.tamanho) {
                case 'broto':
                    preco = cardapio.camarao_broto
                    break
                case 'média':
                    preco = cardapio.camarao_media
                    break
                case 'grande':
                    preco = cardapio.camarao_grande
                    break
                case 'família':
                    preco = cardapio.calabresa_familia
                    break
            }
            break
        case 'calabresa':
            switch (parametros.tamanho) {
                case 'broto':
                    preco = cardapio.calabresa_broto
                    break
                case 'média':
                    preco = cardapio.calabresa_media
                    break
                case 'grande':
                    preco = cardapio.calabresa_grande
                    break
                case 'família':
                    preco = cardapio.calabresa_familia
                    break
            }
            break
        case 'atum':
            switch (parametros.tamanho) {
                case 'broto':
                    preco = cardapio.atum_broto
                    break
                case 'média':
                    preco = cardapio.atum_media
                    break
                case 'grande':
                    preco = cardapio.atum_grande
                    break
                case 'família':
                    preco = cardapio.atum_familia
                    break
            }
            break
        case 'frango':
            switch (parametros.tamanho) {
                case 'broto':
                    preco = cardapio.frango_broto
                    break
                case 'média':
                    preco = cardapio.frango_media
                    break
                case 'grande':
                    preco = cardapio.frango_grande
                    break
                case 'família':
                    preco = cardapio.frango_familia
                    break
            }
            break
        case 'brigadeiro':
            switch (parametros.tamanho) {
                case 'broto':
                    preco = cardapio.brigadeiro_broto
                    break
                case 'média':
                    preco = cardapio.brigadeiro_media
                    break
                case 'grande':
                    preco = cardapio.brigadeiro_grande
                    break
                case 'família':
                    preco = cardapio.brigadeiro_familia
                    break
            }
            break
        case 'banana':
            switch (parametros.tamanho) {
                case 'broto':
                    preco = cardapio.banana_broto
                    break
                case 'média':
                    preco = cardapio.banana_media
                    break
                case 'grande':
                    preco = cardapio.banana_grande
                    break
                case 'família':
                    preco = cardapio.banana_familia
                    break
            }
            break
        case 'doce de leite':
            switch (parametros.tamanho) {
                case 'broto':
                    preco = cardapio.doceDeLeite_broto
                    break
                case 'média':
                    preco = cardapio.doceDeLeite_media
                    break
                case 'grande':
                    preco = cardapio.doceDeLeite_grande
                    break
                case 'família':
                    preco = cardapio.doceDeLeite_familia
                    break
            }
            break
    }

    switch (parametros.bebida) {
        case 'Refrigerante':
            preco += cardapio.refrigerante
            break
        case 'suco':
            preco += cardapio.suco
            break
        case 'água':
            preco += cardapio.agua
            break
        case 'água de coco':
            preco += cardapio.aguaDeCoco
            break
    }
}

const defaultWelcomeIntent = (agent) => {
    const texto = [
          'Olá! Seja bem-vindo(a) a Pizzaria Tre Fratelli.'
        , 'Gostaria de fazer um pedido ou dar uma olhada no nosso cardápio ?'
    ]

    agent.add(texto)
}

const verCardapioIntent = (agent) => {
    const texto = [
          'Confira nosso cardápio.'
        , new Image('https://i.ibb.co/3pvzLYr/cardapio.png')
        , 'Estarei pronto para anotar seu pedido, é so me chamar.'
    ]

    agent.add(texto)
}

const fazerPedidoIntent = (agent) => {
    const parametros = agent.parameters
    const texto = [
        `Anotado, ${parametros.quantidade_pizza} pizza de ${parametros.sabor} com ${parametros.borda} e ${parametros.bebida}.`
    ]

    setPreco(parametros)

    agent.add(texto)
    agent.add('Deseja finalizar o pedido ?')
}

const fazerPagamentoIntent = (agent) => {
    const parametros = agent.parameters
    let texto = ''

    if (parametros.resposta == 'sim') {
        texto = [
              `O total do pedido foi R$ ${preco}.`
            , 'Qual será a forma de pagamento ?'
        ]
    } else {
        texto = [
            'Que pena que queira cancelar o pedido mas caso mude de ideia é so me chamar, estarei pronto para anotar o seu pedido.'
        ]
    }

    agent.add(texto)
}

const finalizarPedidoIntent = (agent) => {
    const texto = [
        'Muito bem, dentro de alguns minutos seu pedido chegará.'
    ]

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