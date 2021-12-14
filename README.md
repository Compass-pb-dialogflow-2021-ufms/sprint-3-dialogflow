# Projeto-Sprint-3
Foi desenvolvido um chabot para uma pizzaria.
### Diário de Bordo:
Em primeiro plano planejei a linha de conversação do bot. Logo após criei um projeto no Dialogflow, definindo as entities e seus valores. Em seguida programei as intents e treinei algumas frases. Depois disso desenvolvi algumas funcionalidades de conversação do sistema e a API interna, que foi conectada ao dialogflow. Posteriormente fiz a integração do chatbot com o telegram e realizei diversos testes. E por fim, subi o projeto neste repositório e realizei o deploy do mesmo na Heroku;
### Algumas tecnologias usadas:
* [Nodejs](https://nodejs.org/en/): Linguagem utilizada para desenvolvimento da aplicação;
* [Express](https://www.npmjs.com/package/express): Framework que auxiliou no desenvolvimento da API;
* [Dialogflow-fulfillment](https://www.npmjs.com/package/dialogflow-fulfillment): Biblioteca que ajudou na conexão entre a API interna e o Dialogflow;
* [Action-on-google](https://www.npmjs.com/package/actions-on-google) : Biblioteca que facilitou criação de ações com o Dialogflow;
## Como Funciona o Sistema:
O usuário envia uma mensagem através do canal de chat (Telegram, API client, chat teste do próprio dialogflow), o dialogflow interpreta está mensagem e designa a intent que está mais prepara para tratar essa mensagem. A intent chama o webhook do fulfillment que fará uma requisição a api interna. O arquivo [index.js](https://github.com/Compass-pb-dialogflow-2021-ufms/sprint-3-dialogflow/blob/denner-basilio/index.js), responsável pelo levantamento do sistema, vai ser o primeiro a ser chamado. Index.js passará a requisição para [rotaPizzaria.js](https://github.com/Compass-pb-dialogflow-2021-ufms/sprint-3-dialogflow/blob/denner-basilio/Rotas/rotaPizzaria.js), onde está a rota POST, rota que irá convocar [respostasIntents.js](https://github.com/Compass-pb-dialogflow-2021-ufms/sprint-3-dialogflow/blob/denner-basilio/Intents/respostasIntents.js) que possui a função que realizará o tratamento de todas as respostas do chatbot;

*Obs.: [valores.js](https://github.com/Compass-pb-dialogflow-2021-ufms/sprint-3-dialogflow/blob/denner-basilio/Produtos/valores.js) possui os valores de todos os produtos da pizzaria, assim fica mais fácil a manutenção dos preços. Ela será acionada no momento do cálculo do valor dos pedidos;

## Como utilizar a Aplicação:
### Localmente(Faz-se necessário ter Nodejs e Ngrok em sua máquina):
1. Clone esse repositório;
2. No terminal do arquivo digite :" **npm install** " para instalar as dependências
3. Novamente no terminal do arquivo digite: " **node index.js** " para iniciar a aplicação
4. Use o [ngrok](https://ngrok.com/) para transformar seu servidor local num servido remoto
5. Adicione "/pizzaria" na Url disponibilizada pelo ngrok
6. Insira esta Url em **Dialogflow -> fulfillment -> webhook**
7. E utilizei o projeto no canal de conversação de sua escolha.
### Remotamente:
1. Para utilizar remotamente basta você realizar requisição do tipo POST pela URL : https://projeto-sprint-three.herokuapp.com/pizzaria
### Telegram :
1. Para utilizar via Telegram acesse o link: [t.me/DbotTF_bot](https://t.me/DbotTF_bot)
