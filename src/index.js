import express from 'express';
import dotenv from 'dotenv/config';
import mongoose from '../src/database/database.js';

import cors from 'cors';
import router from '../src/routes/routes.js';


const app = express();
app.use(express.json());
app.use(cors());

app.use('/novedades', router)

try {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, ()=> console.log(`escuchando el puerto ${PORT}`));
} catch (error) {
    
}