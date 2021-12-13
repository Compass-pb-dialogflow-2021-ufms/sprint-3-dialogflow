# Avaliação Sprint 3 - Programa de Bolsas Compass.uol e UFMS

## Diário de bordo
Iniciei fazendo um fluxo de como seria a conversa de um usuario com o bot, logo após fui criar todas as Entities que poderiam ser necessarias para a 
criação de um pedido, seguindo fui para as Intents introdutorias para levar o usuario até ele poder realizar o seu pedido, então pensei em todo o contexto possivel
que o mesmo podia pensar ou passar sobre com respostas mais informais e/ou respostas diretas nos pedidos. Adiante segui com a parte principal, o fluxo de menu de pizzas e bebidas
com diversos sabores e preços, comecei dando um valor padrão para cada pizza e bebida disponivel no menu e depois fui realmente codar toda a parte de resposta onde podemos ver na controladorDePedidos.js onde pensei em um switch que vai trocando as intents e respondendo e devolvendo o sabor e preço especifico de cada produto. Em diante pesquisando mais sobre nos videos de dialogflow descobri o glitch, um site onde pode-se criar projetos e hospedar os mesmos e edita-los bem rapidamente e utilizei-o para dar conexão em um rota de post no Fulfillment para ir testando as entradas e todo o contexto que o usuario podia passar. No final foi deixar o codigo mais limpo e integrar ao telegram com o token.

## Entrega
Para iniciar a aplicação, deve-se possuir o Node.JS na maquina.<br>
1- Na pasta do projeto, abra o terminal e digite npm install para instalar todas as dependencias.<br>
2- Após instalar, digite npm start para iniciar a aplicação.<br>
3- Caso possua o ngrok(https://ngrok.com/download), abra e digite ngrok http 3000, e logo após apareça o link https de onde está hospedado a aplicação.<br>
4- Logo após extraia o zip e importe o bot para o dialogflow na aba de configurações e Export and Import.<br>
5- O bot já deve estar online, copiei e cole o link https feito no ngrok na aba Fulfillment no dialogflow.<br>
6- Pronto, o bot já deve estar pronto para uso!

## Rota e Link do Bot
<li>Link do bot no telegram: t.me/trefratelli_bot
<li>Link da rota post no glitch: https://pizzariabotzin.glitch.me/pizzariabot