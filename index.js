const express = require("express");
const fulfill = require("dialogflow-fulfillment");
const preco = require("./Itens/preco");

const app = express();

app.get("/", (req, res) => {
  res.send("Funcionando perfeitamente!");
});

app.post("/", express.json(), (req, res) => {
  const agent = new fulfill.WebhookClient({
    request: req,
    response: res,
  });

  function cardapio() {
    agent.add(` Pizzas tradicionais:
        4 Queijos: R$${preco.sabor.quatroQuiejos} |
        Atum: R$${preco.sabor.atum} |
        Calabresa: R$${preco.sabor.calabresa} |
        Camarão: R$${preco.sabor.camarao} |
        Frango: R$${preco.sabor.frango}`);
    agent.add(` Pizzas doces: 
        Banana: R$${preco.sabor.banana} |
        Brigadeiro: R$${preco.sabor.brigadeiro} |
        Doce de Leite: R$${preco.sabor.doceDeLeite} `);
  }

  function cardapioBebidas() {
    agent.add(` Bebidas:
      Água: R$${preco.bebida.agua}
      Água de Coco: R$${preco.bebida.aguaCoco}
      Refrigerante: R$${preco.bebida.refrigerante}
      Suco: R$${preco.bebida.suco}
    `);
  }

  //primeiro contato com o cliente
  function welcome(agent) {
    agent.add("Olá, seja bem vindo(a) a Pizzaria Tre Fratelli.");

    agent.add("Este é o cardápio de pizzas da casa: ");
    cardapio();

    agent.add("Essas são as bebidas disponíveis: ");
    cardapioBebidas();

    agent.add("Gostaria de pedir uma pizza ou alguma bebida?");
  }
  //resposta caso o bot não compreenda a mensagem
  function fallback(agent) {
    agent.add("Lamento, mas não compreendi. Poderia repetir?");
  }
  //pedido de pizza
  function pedirPizza(agent) {
    let quantidade = agent.parameters.quantidade;
    let sabor = agent.parameters.sabor;
    let tamanho = agent.parameters.tamanho;
    let borda = agent.parameters.borda;

    agent.add(
      `Certo, ${quantidade} pizza(s) de sabor ${sabor} e tamanho ${tamanho} e ${borda}! Alguma bebida para acompanhar?`
    );
  }
  //Tentei manipular o contexto pelo nodejs com a biblioteca do dialogflow fulfillment, porém não obtive sucesso (me custou mt tempo isso )
  // function pedirPizzaNop(agent) {
  //   //pedidoContexto = agent.context.get('pedirPizza')
  //   let quantidade = agent.parameters.get('pedirPizza');

  //   agent.add(`Ok, o pedido ficou assim: ${quantidade}`);

  // }

  function pedirPizzaYes(agent) {
    agent.add("Gostaria de qual bebida?");
    cardapioBebidas();
  }

  function pedirBebida(agent) {
    let quantidade = agent.parameters.quantidade;
    let bebida = agent.parameters.tiposbebida;
    cardapioBebidas();
    
  }

  function confirmaBebida(agent) {}

  let intentMap = new Map();

  intentMap.set("Default Welcome Intent", welcome);
  intentMap.set("Default Fallback Intent", fallback);
  intentMap.set("pedirPizza", pedirPizza);
  intentMap.set("pedirBebida", pedirBebida);
  intentMap.set("pedirPizza - yes", pedirPizzaYes);
  //intentMap.set("pedirPizza - no", pedirPizzaNop);

  agent.handleRequest(intentMap);
});

const port_number = process.env.PORT || 3003;
app.listen(port_number, () => {
  console.log("Servidor está na porta 3003");
});
