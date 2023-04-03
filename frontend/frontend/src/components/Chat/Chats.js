import React, { useState } from 'react'
import Chat from './Chat'
import { ChatData } from "./ChatData";
import './Chats.css';
import DropdownFilter from './ChatFilter';

export const Chats = () => {

  //arrays to hold search bar queries
  const [searchedArray, setSearchedArray] = React.useState(ChatData);
  const [searchString, setSearchString] = useState("");

  //change the output given the current search query
  React.useEffect(() => {
    if(searchString.length === 0){
      setSearchedArray(ChatData)
    } else {
      const searchedObjects = []
      
      ChatData.forEach((chatObj, index) => {
        Object.values(chatObj).every((onlyValues, valIndex) => {
          if(onlyValues.toLowerCase().includes(searchString.toLowerCase())){
            searchedObjects.push(chatObj)
            return;
          }
        })
      })
      setSearchedArray(searchedObjects) 
    }
  }, [searchString])


    return (
        <div className="messages">
        
        <div className="searchbar">
        <input 
          type="text"
          value={searchString}
          onChange={(e) => setSearchString(e.target.value)}
          placeholder="Search for someone..."
        />

        <DropdownFilter />
        </div>
        
        
      
      <pre>
        {searchedArray.map( (searchedArray) => (
                <Chat
                name = {searchedArray.name} 
                message = {searchedArray.message}                 
                timestamp = {searchedArray.timestamp} 
                profilePic = {searchedArray.profilePic} />
        ))}
      </pre>
      </div>
    )
}


export default Chats