import express from 'express';
//importing mongoose to connect to the database
import mongoose from 'mongoose';
import transactionRouter from './routes/transactionRoutes.js';
import router from './routes/userRoutes.js';
import cors from 'cors';

const app = express();

app.use(cors());
//recieving json body
//another middleware
app.use(express.json()); 
//detecting the router
app.use("/api/user", router);
//importing transaction router
app.use("/api/transaction", transactionRouter);


//connecting to mongodb
mongoose.connect('mongodb+srv://jude:gugaHill@cluster0.6o0gnny.mongodb.net/selling?retryWrites=true&w=majority')
.then(() =>app.listen(5000)) //defining the port the application will run on
.then(() => 
console.log("Connected to DB and is listening to localhost 5000"))
.catch((err)=> console.log(err));

