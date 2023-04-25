import React from 'react';
import {AppBar, Button, Toolbar, Typography, Box, Tab, Tabs} from '@mui/material';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from '../store';

const Header = () => {
    const dispatch = useDispatch(); //dispatch action to redux
    const isLoggedIn = useSelector(state => state.isLoggedIn);

    //maybe add image that returns user to home or "/"
  return (
    <AppBar position="sticky" sx={{background:"purple"}}>
        <Toolbar>
            <Typography variant ="h6"></Typography>
            { isLoggedIn && <Box display="flex">
                <Tabs textColor='inherit'>
                    <Tab LinkComponent={Link} to="/" label="Home"/>
                    <Tab LinkComponent={Link} to="/account" label="Account"/>
                    {/*Added by Dylan*/} 
                    <Tab LinkComponent={Link} to="/CvCard" label="CV"/>
                    <Tab LinkComponent={Link} to="/chat" label="Chat"/>
                </Tabs>
            </Box> }
            <Box display="flex" marginLeft={'auto'}>
            <Tabs textColor='inherit' > 
                <Tab LinkComponent={Link} to="/myTransactions" label="My Posts"/>
                <Tab LinkComponent={Link} to="/transactions/create" label="Post a Job"/>
                <Tab LinkComponent={Link} to="/transactions" label="Available Jobs"/>
                 </Tabs>
                { !isLoggedIn && <Button LinkComponent={Link} to="/auth" variant='contained' sx={{margin: 1, borderRadius:10, background:"#104C71"}} >Login</Button>}
                { isLoggedIn && <Button onClick={()=>dispatch(authActions.logout())} LinkComponent={Link} to="/auth" variant='contained' sx={{margin: 1, borderRadius:10, background:"#104C71"}}>Log out</Button>}
            </Box>
        </Toolbar>
    </AppBar>
  )
}

export default Header