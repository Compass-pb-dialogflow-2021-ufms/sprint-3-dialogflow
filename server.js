 const express = require('express')
// const routerPizzaria = require('./router/pizzaria')
 const port_number = process.env.PORT || 3003;

 const app = express()

// app.use(express.json());
// app.use(express.urlencoded({extended:true}));


// app.get("/", (req, res) => {
//   res.send('Funcionando perfeitamente!');
// });


 app.listen(port_number, () => {
   console.log(`Servidor está na porta ${port_number}`);
 });

// app.use('/pizzabot', routerPizzaria);
