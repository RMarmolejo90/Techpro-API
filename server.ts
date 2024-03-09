import express, { Request, Response } from 'express';
import helmet from 'helmet';
import auth from 'express-oauth2-jwt-bearer';
const app = express();
const PORT = process.env.PORT || 3000

// use helmet for security headers
app.use(helmet);

const jwtCheck = auth({
  audience: 'https://techpro-crm.com',
  issuerBaseURL: 'https://dev-68fa5uuafcp1ug3t.us.auth0.com/',
  tokenSigningAlg: 'RS256'
});

// enforce on all endpoints
app.use(jwtCheck);

app.get('/authorized', function (req, res) {
    res.send('Test Resource');
});

app.listen(PORT;

console.log('Running on port ', PORT);