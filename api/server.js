const express = require('express');
const cors = require('cors');
const {expressjwt} = require('express-jwt');
const jwks = require('jwks-rsa');
const axios = require('axios');


const app = express();
app.use(cors()); 

const verifyJwt = expressjwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri:'https://dev-d600gry0by2gvod0.us.auth0.com/.well-known/jwks.json'
    }),
    audience: 'identificador unico da api' ,
    issuer: 'https://dev-d600gry0by2gvod0.us.auth0.com/',
    algorithms: ['RS256']
}).unless({path:['/']});

app.use(verifyJwt);

app.get('/', (req, res) => {
    res.send('Rota index');
});

app.get('/protected', (req, res) => {
    res.send('Rota protegida');
});

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    const status = error.status || 500;
    const message = error.message || "Erro";
    res.status(status).send(message);
})

app.listen(4000, () => console.log('Servidor na porta 4000'));