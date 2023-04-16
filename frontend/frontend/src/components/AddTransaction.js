import React, { useState } from 'react';
import {Box, Button, InputLabel, TextField, Typography} from "@mui/material";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AddTransaction.css';

const AddTransaction = () => {
  const navigate = useNavigate();   
  const [inputs, setInputs] = useState({
    title: "",
    description:"",
    phone:"",
    location:""
  });
  const handleChange = (e) => {
    setInputs((previousState) => ({
      ...previousState,
      [e.target.name]: e.target.value,
    }));
  };
  //creating function to send request to backend
  const sendRequest = async() => {
    const res = await axios.post("http://localhost:5000/api/transaction/create", {
      title: inputs.title,
      description: inputs.description,
      phone: inputs.phone,
      location: inputs.location,
      user: localStorage.getItem("userId")//getting user from the local storage
    }).catch(err => console.log(err)); //if any error
    const data = await res.data; //getting the data from the response
    return data;
  }; 
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest().then((data) => console.log(data)).then(()=> navigate("/myTransactions"));
  }
   //defining object before rendering component 
  return (
    <div class="create-job">
      <form onSubmit={handleSubmit} >
        <Box border={1} borderRadius={2} boxShadow="5px 5px 5px #ccc" padding={3} margin={"auto"} display='flex' flexDirection={'column'} width={"50%"} height={"10%"} marginTop={10} marginBottom={10}>
          <Typography fontWeight={'bold'} padding={3} variant="h4" textAlign={'center'}>Post a Job</Typography>

          <InputLabel sx={{marginBottom:1, marginTop:2, fontSize:'15px', fontWeight:'bold'}}>Title</InputLabel>
          <TextField name="title" onChange={handleChange} value={inputs.title}  margin ='normal' variant="filled"/>

          <InputLabel sx={{marginBottom:1, marginTop:2, fontSize:'15px', fontWeight:'bold'}} >Description</InputLabel>
          <TextField name="description" onChange={handleChange} value={inputs.description}  margin ='normal' variant="filled"/>

          <InputLabel sx={{marginBottom:1, marginTop:2, fontSize:'15px', fontWeight:'bold'}}>Phone Number</InputLabel>
          <TextField name="phone" onChange={handleChange} value={inputs.phone}  margin ='normal' variant="filled"/>

          <InputLabel sx={{marginBottom:1, marginTop:2, fontSize:'15px', fontWeight:'bold'}}>Location</InputLabel>
          <TextField name="location" onChange={handleChange} value={inputs.location}  margin ='normal' variant="filled"/>
          
          <Button sx={{borderRadius:2, marginTop:3}} variant="contained" color="primary" margin="normal" type="submit">Add</Button>
        </Box>
      </form>
    </div>
  );
};

export default AddTransaction;