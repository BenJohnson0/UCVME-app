import axios from 'axios';
import React, { useEffect,  useState} from 'react';
import { useNavigate, useParams} from 'react-router-dom';
import {Box, Button, InputLabel, TextField, Typography} from "@mui/material";

const TransactionInfo = () => {
  const navigate = useNavigate();
  const [transaction, setTransaction] = useState();
  const id = useParams().id; //getting id from the url
  console.log(id);
  const [inputs, setInputs] = useState({
  });

  const handleChange = (e) => {
    setInputs((previousState) => ({
      ...previousState,
      [e.target.name]: e.target.value,
    }));
  };

  const fetchDetails = async () => {
    const res = await axios.get(`http://localhost:5000/api/transaction/${id}`).catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };

  useEffect(() => {
    fetchDetails().then((data) => {
      setTransaction(data.transaction) 
      setInputs({title:data.transaction.title, description:data.transaction.description, phone:data.transaction.phone, location:data.transaction.location})
    });
  }, [id]); //fetching the details of the transaction

   //sending request to backend
  const sendRequest = async () => {
    const res = await axios.put(`http://localhost:5000/api/transaction/update/${id}`, {
      title: inputs.title,
      description: inputs.description,
      phone: inputs.phone,
      location: inputs.location
    }).catch(err => console.log(err));
    const data = await res.data;
    return data;
  }
  console.log(transaction);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest().then((data) => console.log(data)).then(()=> navigate("/myTransactions")); //navigate back to my blogs
  }

  return (
    <div>
      {inputs &&
      <form onSubmit={handleSubmit}>
        <Box border={1} borderRadius={2} boxShadow="5px 5px 5px #ccc" padding={3} margin={"auto"} display='flex' flexDirection={'column'} width={"70%"} height={"10%"} marginTop={10}>
          <Typography fontWeight={'bold'} padding={3} variant="h6" textAlign={'center'}>Post a job</Typography>

          <InputLabel sx={{marginBottom:1, marginTop:2, fontSize:'15px', fontWeight:'bold'}}>Title</InputLabel>
          <TextField name="title" onChange={handleChange} value={inputs.title}  margin ='normal' variant="filled"/>

          <InputLabel sx={{marginBottom:1, marginTop:2, fontSize:'15px', fontWeight:'bold'}} >Description</InputLabel>
          <TextField name="description" onChange={handleChange} value={inputs.description}  margin ='normal' variant="filled"/>

          <InputLabel sx={{marginBottom:1, marginTop:2, fontSize:'15px', fontWeight:'bold'}}>Phone</InputLabel>
          <TextField name="phone" onChange={handleChange} value={inputs.phone}  margin ='normal' variant="filled"/>

          <InputLabel sx={{marginBottom:1, marginTop:2, fontSize:'15px', fontWeight:'bold'}}>Location</InputLabel>
          <TextField name="location" onChange={handleChange} value={inputs.location}  margin ='normal' variant="filled"/>

          <Button sx={{borderRadius:2, marginTop:3}} variant="contained" color="primary" margin="normal" type="submit">Update</Button>
        </Box>
      </form>}
    </div>
  )
};

export default TransactionInfo