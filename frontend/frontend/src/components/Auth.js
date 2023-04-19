import { TextField, Typography,  Box, Button } from '@mui/material';
import React, { useState } from 'react';
import axios from "axios"; //axios to send request to the backend
import { useDispatch } from 'react-redux';
import { authActions } from '../store';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

const Auth = () => {
  const direct = useNavigate(); //to automatically direct the user to the "My Transactions" page
  const dispatch = useDispatch(); //updating the state //dispatch the actions to redux
  const [inputs, setInputs] = useState({
    name:"", //empty string as the initial state
    email: "",
    password:"",
  }); //to render the state of the fields  
  const [isSignup, setIsSignup] = useState(false); //to change screen to register page
  const handleChange = (e) => {
    setInputs((previousState) => ({
      ...previousState, //store previous state
      [e.target.name] : e.target.value, //add and update to new value
    })); 
  };

  //sending request from axious 
  const sendRequest = async (type = "login") => {
    const res = await axios.post(`http://localhost:5000/api/user/${type}`, { //storing the response 
      name: inputs.name,
      email: inputs.email,
      password: inputs.password,
    })
    .catch(err => console.log(err));
     const data = await res.data;//receiving data from response
     console.log(data);
     return data;
  }; 

  const handleSubmit = (e) => {
    //prevent default behaviour of the browser
    e.preventDefault();
    console.log(inputs);
    if(isSignup) {
      sendRequest("signup").then((data) => localStorage.setItem("userId", data.user._id))
      .then(()=> dispatch(authActions.login()))
      .then(()=>direct("/myTransactions"))
      .then((data)=>console.log(data)); //updating the state and getting action
    }
    else {
      sendRequest().then((data) => localStorage.setItem("userId", data.user._id))
      .then(()=> dispatch(authActions.login()))
      .then(()=>direct("/myTransactions"))
      .then((data)=>console.log(data));//calling login function
    }
  };
  
  return (
    <div class="bg-container">
      <div class="input-form">
      <form onSubmit={handleSubmit}>
        <Box display="flex" flexDirection={'column'} alignItems='center' justifyContent={'center'} padding={3} margin='auto' marginTop={5} borderRadius={5}>
          <Typography padding={3} textAlign="center" fontSize={25}>
          {isSignup ? "Sign up" : "Login"}
          </Typography>
         { isSignup && <TextField name="name" onChange={handleChange} value={inputs.name} marginTop={0} sx={{width: { sm: 120, md: 260 }, "& .MuiInputBase-root": {height: 50}}} id="standard-basic" label="Enter Name" variant="filled" />} {" "}
         <TextField name="email" onChange={handleChange} value={inputs.email} type={'email'} margin="normal" sx={{width: { sm: 120, md: 260 }, "& .MuiInputBase-root": {height: 50}}} id="standard-basic" label="Enter Email" variant="filled"/>
         <TextField name="password" onChange={handleChange} value={inputs.password} type={'password'} margin="normal" sx={{width: { sm: 120, md: 260 }, "& .MuiInputBase-root": {height: 50}}} id="standard-basic" label="Enter Password" variant="filled"/>
         <Button type='submit' sx={{borderRadius:4, marginTop:3, background:"#104C71"}} variant="contained" color="primary" margin="normal">{isSignup ? "Sign up" : "Login"}</Button>
         <Button onClick={() => setIsSignup(!isSignup)} sx={{borderRadius:1, marginTop:2}} > {isSignup ? "Login": "Not registered? Sign up"}</Button>
        </Box>
      </form>
      </div>
    </div>
  )
}

export default Auth; 
