import mongoose from "mongoose";
import Transaction from "../models/Transaction.js";
import User from "../models/User.js";

export const getAllTransactions = async(req, res, next) => {
    let transactions;
    try {
        transactions = await Transaction.find().populate('user');
    } catch {
        return console.log(err)
    }
    if(!transactions) {
        return res.status(404).json({message: "No transactions found"})
    }
    return res.status(200).json({transactions})
};

export const createTransaction = async(req, res, next) => {
    const {title, description, phone, location, user} = req.body;
    //adding the user for each blog by including the id
    //validation 
    let userExists;
    try{
        userExists = await User.findById(user);//find by the user's id
    } catch (err){ 
        return console.log(err);
    }
    if(!userExists) {
        return res.status(500).json({message: "unable to find the user"});
    }
    //if user id can by found, then create a new transaction for that user
    //defining new transaction instance
    const transaction = new Transaction({
        title, 
        description, 
        phone,
        location,
        user,
    }) 
    try{
       const session = await mongoose.startSession(); //saving the transaction for that user
       session.startTransaction();
       await transaction.save({session});
       userExists.transactions.push(transaction); //pushing the transaction to the users array
       await userExists.save({session});
       await session.commitTransaction(); //committing the session 
    }catch (err) {
        console.log(err);
        return res.status(500).json({message: "error"})
    }
    return res.status(200).json({transaction});
    
};

export const updateTransaction = async (req, res, next) => {
    //update the title and description 
    const{title, description, phone, location} = req.body; 
    const transactionId = req.params.id; //grabbing the id from the request params
    let transaction;
    try {
        transaction = await Transaction.findByIdAndUpdate(transactionId, {
        title,
        description,
        phone,
        location
    });
    }catch (err) {
        return console.log(err);
    }
    if(!transaction) {
        return res.status(500).json({message: "Unable to update transaction"});
    }
    return res.status(200).json({transaction});//send the transaction we updated
};

export const getById = async(req, res, next) => {
    const id = req.params.id;
    let transaction;
    try{
        transaction = await Transaction.findById(id); //returning the transaction by id
    } catch (err) {
        return console.log(err);
    }
    //validation 
    if(!transaction) {
        return res.status(404).json({message: "no transaction found"});
    }
    return res.status(200).json({transaction});
};

export const deleteTransaction = async (req, res, next) => {
    const id = req.params.id;
    let transaction;
    try{
        transaction = await Transaction.findByIdAndRemove(id).populate('user');//finding the transaction by its id and removing it from the database //refrence to the user
        await transaction.user.transactions.pull(transaction);//removing the transaction for the speific user array
        await transaction.user.save();//save the user
    } catch (err) {
        return console.log(err);
    }
    if(!transaction){
        res.status(500).json({message: "unable to delete"});
    }
    return res.status(200).json({message:"transaction successfully deleted"}); 
};

export const getByUserId = async (req, res, next) => {
    const userId = req.params.id;
    let userTransactions;
    try{
        userTransactions = await User.findById(userId).populate("transactions"); //finding the user by its id and geting the data from transaction for only thr specific user
    
    } catch (err){
        return console.log(err);
    }
    if(!userTransactions) {
        return res.status(404).json({message: "no transactions found"});
    }
    return res.status(200).json({transactions: userTransactions});
};