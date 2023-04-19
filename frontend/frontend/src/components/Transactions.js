import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Transaction from './Transaction.js';
import './Transactions.css';

const Transactions = () => {
  const [transactions , setTransactions] =  useState(); //storing the transactions
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
    <div class="scrollable">
      <div class="inner">
     {transactions && transactions.map((transaction, index) => (
      <Transaction id={transaction._id} isUser={localStorage.getItem("userId") ===transaction.user._id} title={transaction.title} description={transaction.description} userName={transaction.user.name} phone={transaction.phone} location={transaction.location}/>
     ))} 
      </div>
    </div>
  );
};

export default Transactions