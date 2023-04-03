import express from 'express';
import { createTransaction, deleteTransaction, getAllTransactions, getById, getByUserId, updateTransaction } from '../controllers/transactionController.js';

const transactionRouter = express.Router();

transactionRouter.get("/", getAllTransactions);
transactionRouter.post("/create", createTransaction);
transactionRouter.put("/update/:id", updateTransaction); //need to get the id of the transaction to also update 
transactionRouter.get("/:id", getById);//returning the transaction from its id
transactionRouter.delete("/:id", deleteTransaction); 
transactionRouter.get("/user/:id", getByUserId);//getting the transactions of the user

export default transactionRouter;

