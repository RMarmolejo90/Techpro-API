import express from 'express';
import { Response, Request } from 'express';
import helmet from 'helmet';
import { auth } from 'express-oauth2-jwt-bearer';
import customerRoutes from './routes/customerRoutes.js';
import connectDB from './utils/connectDB.js';
const app = express();
const PORT = process.env.PORT || 3000
app.use(express.json());

// use helmet for security headers
app.use(helmet());

//connect to database
connectDB().then(() => {
  console.log('Connected to database successfully.');
}).catch(err => {
  console.error('Failed to connect to the database:', err.message);
  process.exit(1);
});

const jwtCheck = auth({
  audience: process.env.AUDIENCE,
  issuerBaseURL: process.env.ISSUERBASEURL,
  tokenSigningAlg: process.env.TOKENTYPE
});


// enforce on all endpoints
app.use(jwtCheck);


// api routes
app.use('/customer', customerRoutes);

// start server
app.listen(PORT);

console.log('Running on port ', PORT);



