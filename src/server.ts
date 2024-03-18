import express from 'express';
import { Response, Request } from 'express';
import helmet from 'helmet';
import { auth } from 'express-oauth2-jwt-bearer';
import customerRoutes from './routes/customerRoutes.js';
const app = express();
const PORT = process.env.PORT || 3000
app.use(express.json());

// use helmet for security headers
app.use(helmet());

const jwtCheck = auth({
  audience: 'https://techpro-crm.com',
  issuerBaseURL: 'https://dev-68fa5uuafcp1ug3t.us.auth0.com/',
  tokenSigningAlg: 'RS256'
});

// enforce on all endpoints
app.use(jwtCheck);

// api routes
app.use('/customer', customerRoutes);

app.get('/authorized', function (_req: Request, res: Response) {
    res.status(200).send('test');
});

// start server
app.listen(PORT);

console.log('Running on port ', PORT);



