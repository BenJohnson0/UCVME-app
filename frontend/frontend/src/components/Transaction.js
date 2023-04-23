//file for each transaction
import React from 'react'
import {Card, Typography, CardContent, Box, IconButton} from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'; 
import MessageIcon from '@mui/icons-material/Message';
import { useNavigate } from 'react-router-dom';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import axios from 'axios';

const Transaction = ({title, description, userName, phone, location, isUser, id}) => {
  
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/myTransactions/${id}`)
  };

  const deleteRequest = async () => {
    const res = await axios.delete(`http://localhost:5000/api/transaction/${id}`).catch(err => console.log(err));
    const data = await res.data;
    return data;
  };
  
  const handleDelete = () => {
    deleteRequest().then(()=> navigate("/")).then(()=> navigate("/transactions"));
  }

  //link user to chat screen directly from job listing
  const goToChat = () => {
    navigate(`/chat/${id}`)
  }

  return (
    <div>  
      {" "}
    <Card sx={{ width: "60%", margin:'auto', marginTop:2, padding:2, bgcolor:'#ddb8e5', border: 2 }}>
    {isUser && (
        <Box display='flex'>
          <IconButton onClick={handleEdit} sx={{marginLeft:"auto"}}><EditOutlinedIcon/></IconButton>
          <IconButton onClick={handleDelete} ><DeleteOutlinedIcon color="warning"/></IconButton>
          <IconButton onClick={goToChat} ><MessageIcon color="info"/></IconButton>
        </Box>
      )}
    <CardContent>
      <Typography sx={{ fontSize: 14 }} gutterBottom>
      {userName}
      </Typography>

      <Typography  component="div">
      {title}
      </Typography>

      <Typography sx={{ mb: 1.5 }} color="text.secondary">
      <br/>
      {description}
      </Typography>

      <Typography  sx={{ mb: 1.5 }} color="text.secondary">
      {phone}
      <IconButton><LocalPhoneIcon color="info"/></IconButton>
      </Typography>

      <Typography  sx={{ mb: 1.5 }} color="text.secondary">
      {location}
      <IconButton><LocationOnIcon color="secondary"/></IconButton>
      </Typography>

    </CardContent>
  </Card>
  </div>
  );
};

export default Transaction;