import mongoose from 'mongoose';
import dotenv from 'dotenv/config';


mongoose.connect(process.env.MONGODB_URI)
.then(()=>console.log('conectado a la base de datos'))
.catch((error) => console.error('Connection error', error));

export default mongoose;