import mongoose from "mongoose";

//building and importing mongoose schema
const Schema = mongoose.Schema;

//user collection
const user_schema = new Schema({
    name:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5
    },
    //multiple transactions for one user
    transactions: [{
        type: mongoose.Types.ObjectId, 
        ref: "Transaction", 
        required:true,
    }],
});

//exporting collection "User" into mongodb
export default mongoose.model("User", user_schema) //users collection
