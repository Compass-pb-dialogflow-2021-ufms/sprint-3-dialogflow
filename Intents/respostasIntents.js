const {WebhookClient,Suggestion} = require('dialogflow-fulfillment');
const valores = require('../Produtos/valores');
let dadosDoPedido = new Object();

let dadosPizza = new Object();

const dialogflowFulfillment = (req,res) => {
    const agent = new WebhookClient({
        request: req,
        response: res
    });

    function welcome(){
        agent.add(`Olá, boas-vindas a Pizzaria Tre Fratelli`);
        agent.add('Para iniciar seu pedido digite "iniciar"');
    }
    function fallback(){
        agent.add("Desculpe, mas não compreendi");
    }
    function iniciarPedido(){
        dadosDoPedido.pizzas = [];
        dadosPizza = {};
        agent.add("Quantas pizza deseja pedir ?");
    }
    function qtdPizza(){
        dadosDoPedido.qtdPizzas = agent.parameters.qtdPizza;
        menuPizzas();
        agent.add("Qual o sabor da 1º pizza?");
    }
    
    function pedidoPizza(){
        let parametros = agent.parameters;
        Object.keys(parametros).forEach(conteudo => {
            if(parametros[conteudo] !== ""){
                dadosPizza[conteudo] = `${parametros[conteudo]}`;
            }  
        })
        
        if(dadosPizza.sabor === undefined){
            agent.add("Qual sabor da pizza?");
        }else if(dadosPizza.tamanho === undefined){
            agent.add(` Tamanhos de pizza: broto, média, grande, família`);
            agent.add("Qual tamanho da pizza?");
        }else if(dadosPizza.borda === undefined){
            agent.add(` R$${valores.comBorda} - Pizza com borda recheada.`);
            agent.add("Com ou sem borda recheada?");
        }else{
            dadosDoPedido.pizzas.push(dadosPizza);
            dadosPizza = {};
            
            if(dadosDoPedido.pizzas.length < dadosDoPedido.qtdPizzas){
                menuPizzas();
                agent.add("Qual sabor da proxima pizza?");
            }else{
                menuBebida();
            }
        }
    }
    function menuPizzas(){
        agent.add(` 
        Pizzas salgadas:
            R$${valores.sabores.quatroQueijo} - 4 queijos 
            R$${valores.sabores.camarao} - camarão 
            R$${valores.sabores.calabresa} - calabresa 
            R$${valores.sabores.atum} - atum 
            R$${valores.sabores.frango} - frango `);
        agent.add(` Pizzas doces: 
            R$${valores.sabores.brigadeiro} - brigadeiro
            R$${valores.sabores.banana} - banana 
            R$${valores.sabores.doceDeLeite} - doce de leite`);
    }
    function menuBebida(){    
        agent.add(` Bebidas: 
            R$${valores.bebidas.refrigerante} - refrigerante
            R$${valores.bebidas.suco} - suco, 
            R$${valores.bebidas.agua} - água
            R$${valores.bebidas.aguaDeCoco} - água de coco`);
        
        agent.add(`Deseja adicionar alguma bebida ao seu pedido ? Se não digite "Pagamento"`);
    }
    function escolhaBebida(){
        dadosDoPedido.bebida = `${agent.parameters.bebida}`;
        if(agent.parameters.qtdBebidas === undefined){
            dadosDoPedido.qtdBebida = 1;
        }else{
            dadosDoPedido.qtdBebida = agent.parameters.qtdBebidas;
        }
        agent.add(`Digite "Pagamento" para escolher a forma de pagamento`);
    }
    function menuPagamento(){
        agent.add(` Formas de pagamento: Cartão de crédito e débito, dinheiro, pix.`);
        agent.add(`Qual sua forma de pagamento ?`);
    }
    function escolhaPagamento(){
        dadosDoPedido.pagamento = `${agent.parameters.pagamento}`;
        agent.add(CalculaValorPedido());
        agent.add(`Caso queira finalizar o pedido digite "sim" ou se quiser cancelar o pedido digite "não".`);

    }
    function CalculaValorPedido(){
        let valor = 0;
        let contador = 0;
        let mensagemCarrinho = `Detalhamento pedido: ${dadosDoPedido.qtdPizzas} pizza `;
        const arrayPizzas = dadosDoPedido.pizzas;
        arrayPizzas.forEach(objeto => {
            contador++;
            mensagemCarrinho += `\n ${contador}º pizza: ${objeto.sabor}, ${objeto.tamanho}, ${objeto.borda} borda;`;
            switch(objeto.sabor){
                case '4 queijo':
                    valor+=valores.sabores.quatroQueijo;
                    break;
                case 'camarao':
                    valor+=valores.sabores.camarao;
                    break;
                case 'calabresa':
                    valor+=valores.sabores.calabresa;
                    break;
                case 'atum':
                    valor+=valores.sabores.atum;
                    break;
                case 'frango':
                    valor+=valores.sabores.frango;
                    break;
                case 'brigadeiro':
                    valor+=valores.sabores.brigadeiro;
                    break;
                case 'banana':
                    valor+=valores.sabores.banana;
                    break;
                case 'doce de leite':
                    valor+=valores.sabores.doceDeLeite;
                    break;
            }
            if(objeto.borda ==="com"){
                valor+=valores.comBorda;
            }
        })
        
        if(dadosDoPedido.bebida !== undefined){
            mensagemCarrinho += `\n Mais ${dadosDoPedido.qtdBebida} garrafa de ${dadosDoPedido.bebida}.`;
            switch(dadosDoPedido.bebida){
                case 'refrigerante':
                    valor+=valores.bebidas.refrigerante * dadosDoPedido.qtdBebida;
                    break;
                case 'suco':
                    valor+=valores.bebidas.suco* dadosDoPedido.qtdBebida;
                    break;
                case 'agua':
                    valor+=valores.bebidas.agua* dadosDoPedido.qtdBebida;
                    break;
                case 'agua de coco':
                    valor+=valores.bebidas.aguaDeCoco * dadosDoPedido.qtdBebida;
                    break;
            }     
        }
        mensagemCarrinho += ` \n Dando um valor total de R$${valor} que será pago no ${dadosDoPedido.pagamento}.`;
        return mensagemCarrinho;
    }
    function simConcluirPedido(){
        agent.add(`Após finalização do preparo o pedido será enviado até a sua casa. Agradecidos por sua escolha`);
        agent.add(`😁`);
        dadosDoPedido = {};
    }
    function naoConcluirPedido(){
        agent.add("Uma pena, caso mude de ideia, estamos à disposição");
        dadosDoPedido = {};
    }
    
    let intentMap = new Map();
    intentMap.set('Default Welcome Intent', welcome);
    intentMap.set('Default Fallback Intent', fallback);
    intentMap.set('iniciarPedido', iniciarPedido);
    intentMap.set('qtdPizza', qtdPizza);
    intentMap.set('dadosPizza', pedidoPizza);
    intentMap.set('escolhaBebida', escolhaBebida);
    intentMap.set('pagamento', menuPagamento);
    intentMap.set('escolhaPagamento', escolhaPagamento);
    intentMap.set('conclusao - yes', simConcluirPedido);
    intentMap.set('conclusao - no', naoConcluirPedido);
    agent.handleRequest(intentMap);
};

module.exports = dialogflowFulfillment;