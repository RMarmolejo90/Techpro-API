import mongoose from 'mongoose';

const connectDB = async () => {
  const DBURI = process.env.DBURI;
  
  if (!DBURI) {
    console.error('Database URI not found, issue with the .env connection URI');
    process.exit(1);
  }

  try {
    await mongoose.connect(DBURI);
    console.log('Connected to database');
  } catch (error) {
    console.error('Error connecting to the database:', error);
    throw error;
  }
};

export default connectDB;
