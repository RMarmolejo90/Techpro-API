import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import { auth } from 'express-oauth2-jwt-bearer';
import customerRoutes from './routes/customerRoutes.js';
import connectDB from './utils/connectDB.js';
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3001

app.use(cors());
app.use(express.json());

// use helmet for security headers
app.use(helmet());

//connect to database

const jwtCheck = auth({
  audience: process.env.AUDIENCE,
  issuerBaseURL: process.env.ISSUERBASEURL,
  tokenSigningAlg: process.env.TOKENTYPE
});


// enforce on all endpoints
app.use(jwtCheck);


app.get('/', (req, res) => {
  res.send("server");
});


app.use('/customers', customerRoutes);


// start server
app.listen(PORT, () => {
  connectDB().catch((err) => console.error('Database connection error:', err));
  console.log(process.env.AUDIENCE);
  console.log(process.env.ISSUERBASEURL);
  console.log(`running on port ${PORT}`);
});




