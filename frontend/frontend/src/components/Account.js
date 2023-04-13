import React, { useEffect, useState } from 'react';
import {Avatar} from '@mui/material';
import axios from 'axios';
import './Account.css';
import AccountName from './AccountName.js';
import FirebaseUpload from './FirebaseUpload.js';

const Account = () => {

    const [transactions , setTransactions] =  useState();

    const sendRequest = async () => {
    const res = await axios.get("http://localhost:5000/api/transaction").catch(err =>console.log(err));
    const data = await res.data;
    return data;
    }
  
    useEffect(()=> {
    sendRequest().then(data=> setTransactions(data.transactions));//sending request to
    }, []); //request to the backend  //useEffect to allow us to run after every render
    console.log(transactions);
   
    return (
        <div class="center-screen">
                <Avatar alt="Remy Sharp" src="./man3.jpg" sx={{ width: 80, height: 80 }}></Avatar>
                
                {/*Logged in username should appear on account page*/}
                <div class="account-name">
                {transactions && transactions.map((transaction, index) => (
                <AccountName id={transaction._id} isUser={localStorage.getItem("userId") ===transaction.user._id} userName={transaction.user.name}/>
                ))} 
                </div>

            <div class="details">
                <FirebaseUpload />
            </div>

            
        </div>

       
        
    )
}

export default Account