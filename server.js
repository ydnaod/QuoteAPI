const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

const quoteRouter = express.Router();
app.use('/api/quotes', quoteRouter);

quoteRouter.get('/random', (req, res, next) => {
    res.send({ quote: getRandomElement(quotes)});
})

quoteRouter.get('/', (req, res, next) => {
    if(req.query.person){
        let arrayToSend = [];
        console.log(req.query.person);
        quotes.forEach(quote => {
        if(quote.person === req.query.person){
            arrayToSend.push(quote);
        }
    })
    res.send({quotes: arrayToSend});
    }
    else{
        arrayToSend = quotes.map(quote => quote);
        res.send({quotes: arrayToSend});
    }
})

quoteRouter.post('/', (req, res, next) => {
    if(req.query.quote && req.query.person){
        res.send({quote: req.query})
        quotes.push(req.query);
    }
    else{
        res.status(400).send('oops');
    }
})

app.use(express.static('public'));
app.listen(PORT, () => {
    console.log('listening on ' + PORT)
});


