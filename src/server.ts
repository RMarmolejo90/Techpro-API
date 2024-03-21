import express from 'express';
import { Response, Request } from 'express';
import helmet from 'helmet';
import { auth, requiredScopes } from 'express-oauth2-jwt-bearer';
import customerRoutes from './routes/customerRoutes.js';
import connectDB from './utils/connectDB.js';
const app = express();
const PORT = process.env.PORT || 3000
app.use(express.json());

// use helmet for security headers
app.use(helmet());

//connect to database
await connectDB();

const jwtCheck = auth({
  audience: 'https://techpro-cms',
  issuerBaseURL: 'https://cms-techpro.us.auth0.com/',
  tokenSigningAlg: 'RS256'
});

const adminPermissions = requiredScopes('')

// enforce on all endpoints
// not used during development
// app.use(jwtCheck);


// api routes
app.use('/customer', customerRoutes);

app.use('/users', auth, adminPermissions);

app.get('/authorized', function (_req: Request, res: Response) {
    res.status(200).send('test');
});

// start server
app.listen(PORT);

console.log('Running on port ', PORT);



