# Avaliação Sprint 3 - Programa de Bolsas Compass.uol e UFMS

Terceira sprint do programa de bolsas Compass.uol para formação em chatbot Dialogflow.


## Execução

- Criar Chatbot em Dialogflow para atender esta necessidade:
  - A Pizzaria Tre Fratelli te contratou para fazer um bot para atender seus clientes.
O bot deve conseguir mostrar ao usuário quais os sabores disponíveis, e guiá-lo ao longo de um pedido.
Para fazer o pedido, são necessárias três informações:
    - qual o sabor da pizza;
    - qual o tamanho;
    - qual a forma de pagamento. 

  - Menu:
    - 5 pizzas salgadas:
      - 4 queijos, camarão, calabresa, atum, frango;
    - 3 pizzas doces:
      - brigadeiro, banana, doce de leite;
    - 4 tipos de bebida:
      - refrigerante, suco, água, água de coco;
    - 4 tamanhos de pizza:
      - broto, média, grande, família; 
    - Opção de pizzas com ou sem borda recheada.
    
- Ao final, deve mostrar as opções escolhidas, o valor do pedido, e perguntar se o cliente deseja concluir o pedido.

- Canal: Telegram.

- Subir serviço Nodejs que trate as respostas;


## Entrega

- Aceitar o convite do repositório da sprint-3-dialogflow;

- Criar uma branch no repositório com o formato nome-sobrenome;

- Subir o trabalho na branch com um readme.md, documentando detalhes sobre como a avaliação foi desenvolvida e como utilizar o sistema.

- O prazo de entrega é até às 13h do dia 14/12 no repositório do github (https://github.com/Compass-pb-dialogflow-2021-ufms/sprint-3-dialogflow).
 ----
## Desenvolvimento

####<p>Inicialmente tive problemas em integrar o bot telegram, mas contornamos este problema posteriormente. Também acredito que o código ficou muito dependente da plataforma web do Dialogflow, muito por conta de utilizar o pacote dialogflow-fulfillment em vez de utilizar o payload puro, o que me limitou e trouxe algumas dificuldades.</p>

## Aplicação

####<p>Conversando com o bot iniciamos com uma mensagem de boas vindas, e logo podemos iniciar o nosso pedido, podendo escolher o sabor, tamanho e tipo de borda de UMA pizza, caso não seja informado esses parametros o bot irá automaticamente perguntar ao usuário, por fim também é possivel pedir uma bebida.</p>
####<p>Então uma mensagem de confirmação de pedido é exibida e em caso afirmativo será perguntado o tipo de pagamento, que podera ser em dinheiro, crédito ou débito e será exibida uma mensagem final ao usuário reforçando o sucesso do pedido. Caso negativo uma mensagem de despedida e exibida.</p>