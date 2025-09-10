const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const router = require('./route');

dotenv.config();
const app = express();


app.use(cors({
    origin:'http://localhost:5173'
}));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use('/api/chat',router);


try {
        mongoose.connect(process.env.MONGODB_URI).then(()=>{
            console.log("Connected To DataBase");
            app.listen(3000,()=>{
            console.log("Running on Port");
        })
    })
} catch (error) {
    console.error("Unabel to Connect to DataBase ",error);
}