import express, { Request, Response } from 'express';
import helmet from 'helmet';


const app = express();
const PORT = process.env.PORT || 3000

// use helmet for security headers
app.use(helmet);

app.listen(PORT, (error?: Error) => {
    if (!error){
        console.log(process.env.HELLO);
        console.log(`Server is Successfully Running, and App is listening on port ${PORT}`);}
    else
        {console.log("Error occurred, server can't start", error);}
});