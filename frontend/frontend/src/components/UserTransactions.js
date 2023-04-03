import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Transaction from './Transaction.js';

const UserTransactions = () => {
  const [transactions, setTransactions ] = useState() //storing the data 
  const id = localStorage.getItem("userId"); //id from the local storage
  const sendRequest  = async () => {
    const res = await axios.get(`http://localhost:5000/api/transaction/user/${id}`)
    .catch(err => console.log(err));
    const data = await res.data;
    return data;

  }
  useEffect(() => {
  sendRequest().then((data)=> setTransactions(data.transactions.transactions));
   }, []); //getting the id
   console.log (transactions); 


  return (
    <div>
      {transactions && transactions.map((transaction, index) => 
      <Transaction id={transaction._id} isUser={true} key={index} title={transaction.title} description={transaction.description}
      phone={transaction.phone} location={transaction.location} />
     )} 
    </div>
  )
}

export default UserTransactions;