let pedido = {
    sabor: null,
    tamanho: null,
    borda: null,
    Bebida: null,
    valor: null,
}

const itemValores = {
    queijos: 15,
    camarao: 20,
    calabresa: 10,
    atum: 10,
    frango: 10,
    brigadeiro: 20,
    banana: 15,
    doceDeLeite: 20,
    refrigerante: 5,
    suco: 5,
    agua: 2,
    aguaDeCoco: 5,
    broto: 30,
    media: 40,
    grande: 50,
    familia: 60,
}

function Funcionamento(agent) {
    agent.add("Nosso atendimento é de terça a domingo, das 18:00 às 23:00")
}

function SolicitarMenu(agent) {
    agent.add("O menu da Tre Fratelli: Pizzas Salgadas: 4 queijos R$ 15, Camarão R$ 20, Calabresa R$ 10, Atum R$ 10, Frango R$ 10, Pizzas Doces: Brigadeiro R$ 20, Banana R$ 15, Doce de leite R$ 20, Tamanhos: Broto R$ 30, Media R$ 40, Grande R$ 50, Familia R$ 60, Bebidas: Refrigeirante R$ 5, Suco R$ 5, Água R$ 2, Água de coco R$ 5");
};

function InformarPedido(agent) {
    console.log(agent)
    pedido.sabor = null;
    pedido.tamanho = null;
    pedido.borda = null;
    pedido.valor = null;
    pedido.Bebida = null;

    pedido.sabor = agent.parameters.tipoPizza;
    pedido.tamanho = agent.parameters.tamanhopizza;
    pedido.borda = agent.parameters.bordaPizza;
    pedido.valor = itemValores[pedido.sabor] + itemValores[pedido.tamanho];

    console.log(pedido);

    agent.add(`Deseja alguma Bebida?`);
}

function InformarBebida(agent) {

    pedido.Bebida = agent.parameters.Bebida;

    agent.add(`Um(a) ${pedido.Bebida} no valor de R$ ${itemValores[pedido.Bebida]}.`);

    agent.add("Deseja finalizar seu pedido?");
}

function FinalizarPedido(agent) {

    const valorPizza = itemValores[pedido.sabor] + itemValores[pedido.tamanho];
    const valorBebida = itemValores[pedido.Bebida];

    if (pedido.Bebida != null) {
        pedido.valor += itemValores[pedido.Bebida];
        agent.add(`Pedido anotado: Uma Pizza de ${pedido.sabor} ${pedido.tamanho} e borda ${pedido.borda} no valor de R$ ${valorPizza}, e um(a) ${pedido.Bebida} no valor de R$ ${valorBebida}.`)
    } else {
        agent.add(`Pedido anotado: Uma Pizza de ${pedido.sabor} ${pedido.tamanho} e borda ${pedido.borda} no valor de R$ ${valorPizza}.`)
    }

    agent.add(`O total é R$ ${pedido.valor}`);

    agent.add("Qual a forma de pagamento?");
}

function InformarPagamento(agent) {

    agent.add("Ok, pedido realizado");
}

module.exports = {
    Funcionamento,
    SolicitarMenu,
    InformarPedido,
    InformarBebida,
    FinalizarPedido,
    InformarPagamento
}