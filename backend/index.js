import express from 'express';
const app = express();
import dotenv from 'dotenv';
dotenv.config();

app.listen(process.env.PORT,(request,response) => {
    console.log(`server running on port ${process.env.PORT}`);
});