import React, { useEffect, useState} from 'react';
import {Avatar} from '@mui/material';
import axios from 'axios';
import './Account.css';
import AccountName from './AccountName.js';
import FirebaseUpload from './FirebaseUpload.js';
import { getStorage, ref, deleteObject } from "firebase/storage";

const Account = () => {

    const [transactions , setTransactions] =  useState();
    const storage = getStorage();
    const CVRef = ref(storage, 'https://firebasestorage.googleapis.com/v0/b/fir-upload-e6811.appspot.com/o/files%2FWIN_20230307_12_53_06_Pro.mp4?alt=media&token=e9a4b94e-7c7a-4a0b-a447-06e4736e0d53');


    const sendRequest = async () => {
    const res = await axios.get("http://localhost:5000/api/transaction").catch(err =>console.log(err));
    const data = await res.data;
    return data;
    }

    const deleteCV = () => {
        deleteObject(CVRef).then(() => {
        }).catch((error) => {
          console.log(error)
          alert("CV removed successfully!")
        });
    }
  
    useEffect(()=> {
    sendRequest().then(data=> setTransactions(data.transactions));//sending request to
    }, []); //request to the backend  //useEffect to allow us to run after every render
    console.log(transactions);
   
    return (
        <div class="scrollable">
            <div class="center-screen">
                <Avatar alt="Remy Sharp" src="./man3.jpg" sx={{ width: 80, height: 80 }}></Avatar>
                
                {/*Logged in username should appear on account page*/}
                <div class="account-name">
                {[...new Set(transactions && transactions.map((transaction, index) => (
                <AccountName id={transactions.user} userName={transaction.user.name}/>
                )))]} 
                </div>
                
            <div class="details">
                <FirebaseUpload />
            </div>

            <div class="video-cv">
                <video width="300" height="200" controls>
                    <source src="https://firebasestorage.googleapis.com/v0/b/fir-upload-e6811.appspot.com/o/files%2FWIN_20230307_12_53_06_Pro.mp4?alt=media&token=e9a4b94e-7c7a-4a0b-a447-06e4736e0d53"/>
                </video>

                <form onSubmit={deleteCV}>
                <button>
                    Delete CV
                </button>
                </form>
            </div>
            </div>
        </div>

       
        
    )
}

export default Account