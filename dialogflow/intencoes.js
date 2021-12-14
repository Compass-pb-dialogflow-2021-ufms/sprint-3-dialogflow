const { WebhookClient } = require('dialogflow-fulfillment')
const Pizza = require('../data base/models/pizza')
const Bebida = require('../data base/models/bebida')


async function adicionarPizza(agent)
{
    const {nome, ingredientes, tamBroto, tamMedio, tamGrande, tamFamilia} = agent.parameters
    const pizza = {nome, ingredientes, tamBroto, tamMedio, tamGrande, tamFamilia}
    
    try
    {
        await Pizza.create(pizza)
        const text = 'Ok, nova pizza inserida com sucesso!!\n' + 
        `Pizza de ${nome}\n` + 
        `Ingredientes: ${ingredientes}\n` +
        `Valor tamanho broto R$: ${tamBroto}\n` +
        `Valor tamanho medio R$: ${tamMedio}\n` +
        `Valor tamanho grande R$: ${tamGrande}\n` +
        `Valor tamanho família R$: ${tamFamilia}`
        agent.add(text)
    }
    catch(erro)
    {
        console.log({erro: erro})
        agent.add('Aconteceu um erro durante a inserção do novo sabor, entre em contato com o suporte técnico')
    }
}


async function adicionarBebida(agent)
{
    const {nome, valor} = agent.parameters
    const bebida = {nome, valor}
    
    try
    {
        await Bebida.create(bebida)
        const text = `Ok, nova bebida inserida com sucesso!!\n${nome}  ====>  R$: ${valor}`
        agent.add(text)
    }
    catch(erro)
    {
        console.log({erro: erro})
        agent.add('Aconteceu um erro durante a inserção do novo sabor, entre em contato com o suporte técnico')
    }
}


async function getMenu(agent)
{
    let text = '-------------------- Menu --------------------'

    const pizza = await Pizza.find()
    pizza.forEach(comestivel => {
        const formatacao = `\n${comestivel.nome} =====> R$: ${comestivel.tamGrande}`
        text += formatacao
    })

    const bebida = await Bebida.find()
    bebida.forEach(drink => {
        const formatacao = `\n${drink.nome} =====> R$: ${drink.valor}`
        text += formatacao
    })

    const obs = '\nOBS: Todos os valores das pizzas no menu se referem ao tamanho grande'
    text += obs
    console.log(text)
    agent.add(text)
}


function bot(req, res)
{
    const agent = new WebhookClient({request: req, response: res})

    let intentMap = new Map()
    intentMap.set('Adicionar sabor de pizza', adicionarPizza)
    intentMap.set('Adicionar uma bebida', adicionarBebida)
    intentMap.set('Ver menu', getMenu)

    agent.handleRequest(intentMap)
}


module.exports = {bot}