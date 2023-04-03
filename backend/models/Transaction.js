import mongoose from "mongoose";

//creating schema
const Schema = mongoose.Schema;

//defining new instance of the schema
const transactionSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    //refernce to the user
    user: {
        type: mongoose.Types.ObjectId, 
        ref: "User",
        required: true,
    }, //one user per transaction 

});

export default mongoose.model("Transaction", transactionSchema);