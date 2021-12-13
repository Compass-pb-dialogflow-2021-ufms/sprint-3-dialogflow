const router = require('express').Router();
const dialogflowFulfillment = require('../Intents/respostasIntents');

router.post('/', (req, res) => {
    try {
        dialogflowFulfillment(req,res);
    } catch (erro) {
        console.error(erro);
    }
});

module.exports = router;