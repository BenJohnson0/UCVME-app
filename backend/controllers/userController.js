//importing user model to create the controller
import User from "../models/User.js";
import bcrypt from 'bcryptjs';//Creating hashed password and store inside mongodb/encryption 

//getting users from the databse
export const getAllUser = async(req, res, next) => {
    let users;
    try{
        users = await User.find(); //finding all documents 
    }catch (err) {
        console.log(err);
    }
    //validation
    if(!users) {
        return res.status(404).json({message: "User not found"}); //if cant find any users
    }
    return res.status(200).json({users});//on success
};

//defining sign up finctionality in controller function
export const signup = async(req, res, next) => {
    //getting from request body
    const {name,email,password} = req.body;
    
    //if user already exists
    //validation
    let userExists; //defining existing user
    try{
        userExists = await User.findOne({email}); //filtering the email on existing user

    }catch (err) {
       return console.log(err);
    }
    if(userExists) {
        return res.status(400).json({message: "User already exists"}); //if user exists
    }
    const hashedPassword = bcrypt.hashSync(password); //hashing the password

    const user = new User({
        name,
        email,
        password: hashedPassword,
        transactions: [], //transaction specific to the user 
    }); //defining new user

    //saving new user
    try{
       await user.save();

    } catch (err) {
       return console.log(err);
    } 
    return res.status(201).json({user}); //on success 
}

//controller function for login 
export const login = async(req, res, next) => {
    const {email,password} = req.body;
    //validation
    let userExists; //defining existing user
    try{
        userExists = await User.findOne({email}); //filtering the email on existing user

    }catch (err) {
       return console.log(err);
    }
    if(!userExists) {
        return res.status(404).json({message: "Email doesn't exist"}); //if user doesnt exist
    }
    //comparing the password user just inserted with the user's existing password
    const isPasswordCorrect = bcrypt.compareSync(password, userExists.password);
    if(!isPasswordCorrect){
        return res.status(400).json({message: "Password is invalid"}); //if password does not exist
    }
    return res.status(200).json({message: "Login successful", user: userExists});

}
