const mongoose = require('mongoose');

const DBURI:string = process.env.DBURI as string;

if (!DBURI){
  console.error('database uri not found, issue with the .env connection uri');
  process.exit(1);
}

connectDB().catch(err => console.log(err));

async function connectDB() {
  try{
  await mongoose.connect(DBURI);
  console.log('connected to database');
  } catch {
    throw new Error ('Error connecting to the databse');
  }
}