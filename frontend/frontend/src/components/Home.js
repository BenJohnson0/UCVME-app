import React from 'react';
import './Home.css';
//<img src="../app_background.jpg" />
//<img src="../handshake.jpg" />

const Home = () => {

    return (
        <div class="bg-container">
            <div class="title">
                <h1 class="heading">Welcome to <span class="heading-color">UCVME</span></h1>
                <h2 class="sub-heading">The best place to find employment.</h2>
            </div>
            
            <div class="bg-img">
                <img src="../app_background.jpg" />
            </div>
            
        </div>
    )
        
    
}

export default Home;