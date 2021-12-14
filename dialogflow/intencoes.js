const { WebhookClient } = require('dialogflow-fulfillment')
const Pizza = require('../data base/models/pizza')
const Bebida = require('../data base/models/bebida')


async function existePizza(nome)
{
    try
    {
        const acharId = await Pizza.findOne({nome: nome})
        if(acharId == null)
            return true
        else
            return false
    }
    catch (erro)
    {
        return false
    }
}


async function existeBebida(nome)
{
    try
    {
        const acharId = await Bebida.findOne({nome: nome})
        if(acharId == null)
            return true
        else
            return false
    }
    catch (erro)
    {
        return false
    }
}


function sejaBemVindo(agent)
{
    agent.add('Seja bem vindo ao Tre Fratelli! Como eu poderia te ajudar hoje? ' + 
    'Posso te mostrar o cardápio, mostrar os ingredientes de uma pizza específica, ' + 
    'além de anotar o seu pedido.')
}


async function adicionarPizza(agent)
{
    const {nome, ingredientes, tamBroto, tamMedio, tamGrande, tamFamilia} = agent.parameters
    const novaPizza = await existePizza(nome)


    if(novaPizza)
    {   
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
    else
    {
        agent.add('O nome da pizza informada já consta no banco de dados.' + 
        ' Caso queira adicionar um novo sabor, mude o nome da pizza!')
    }
}


async function adicionarBebida(agent)
{
    const {nome, valor} = agent.parameters
    const novaBebida = await existeBebida(nome)
    console.log(novaBebida)

    if(novaBebida)
    {
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
    else
    {
        agent.add('O nome da bebida informada já consta no banco de dados.' + 
        ' Caso queira adicionar uma nova bebida, mude o nome dela!')
    }
}


async function getMenu(agent)
{
    let text = '-------------------- Menu --------------------'

    const pizza = await Pizza.find()
    pizza.forEach(comestivel => {
        const formatacao = `${comestivel.nome} =====> R$: ${comestivel.tamGrande}`
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
    intentMap.set('Boas vindas', sejaBemVindo)
    intentMap.set('Adicionar sabor de pizza', adicionarPizza)
    intentMap.set('Adicionar uma bebida', adicionarBebida)
    intentMap.set('Ver menu', getMenu)

    agent.handleRequest(intentMap)
}


module.exports = {bot}