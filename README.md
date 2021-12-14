### Desenvolvimento
<p>O chatbot não entende todas as possibilidades de pedido, seu funcionamento está bem estático, por exemplo só é possivel realizar um pedido de apenas uma pizza e uma bebida ou apenas uma pizza. Outro problema foi a integração do telegram, porem esse impedimento foi solucinado, a implementação foi ok com o dialogflow messenger.</p>

### Tecnologias utilizada
- nodejs 
- expressjs
- dialogflow-fulfillment 
- actions-on-google
- heroku

### Utilizar o chatbot
<p>Link do heroku https://pizzaria-fratelli-chatbot.herokuapp.com/. \n
  Basta colocar o link no campo de URL Webhook na pagina de fulfillment do dialogflow, e é possivel testar no próprio console do dialogflow ou no dialogflow messenger.
  Abaixo esta um trecho de perguntas que segue um fluxo de funcionamento esperado.
</P>

### Exemplo de perguntas para fluxo de funcinamento esperado
```
- olá                             
- Vocês estão atendendo?          
- Eu gostaria de fazer um pedido  
- Um pizza de calabresa           
- media                           
- com recheio                     
- sim                             
- um suco                         
- sim                             
- credito                         
 ```

