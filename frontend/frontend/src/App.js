import Header from "./components/Header";
import React, { useEffect } from "react";
import {Route, Routes} from "react-router-dom";
import Auth from "./components/Auth.js";
import Transactions from "./components/Transactions.js";
import UserTransactions from "./components/UserTransactions.js"
import TransactionInfo from "./components/TransactionInfo.js";
import AddTransaction from "./components/AddTransaction.js"
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./store";
import Home from "./components/Home";

//added by Ben
import ChatScreen from "./components/Chat/ChatScreen.js";
import Chats from "./components/Chat/Chats.js";
import Account from "./components/Account.js";

function App() {
  const dispatch = useDispatch();
  //grabbing the state of redux
  const isLoggedIn = useSelector(state => state.isLoggedIn);
  console.log(isLoggedIn);

  useEffect(() => {
    if(localStorage.getItem("userId")) {
      dispatch(authActions.login());
    }
  }, [dispatch]); //if you reload page, the user stays signed in 

  return <React.Fragment>
    <header>
      <Header/>
    </header>
    <main>
      <Routes>
        <Route path="/auth" element={<Auth/>}/>
        <Route path="/transactions" element={<Transactions/>}/>
        <Route path="/transactions/create" element={<AddTransaction/>}/>
        <Route path="/myTransactions" element={<UserTransactions/>}/>
        <Route path="/myTransactions/:id" element={<TransactionInfo/>}/>

        //added by Ben
        <Route path="/chat" element={<Chats/>}/>
        <Route path="/chat/:id" element={<ChatScreen/>}/>
        <Route path="/account" element={<Account/>}/>
        <Route path="/" element={<Home/>}/>
      </Routes>
    </main>
  </React.Fragment>;
    
}

export default App;
