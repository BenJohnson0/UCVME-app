//Import relevant resources
import React, { useState, useEffect} from "react";
import { ChatData } from "./ChatData";
import Chat from './Chat.js';
import './ChatFilter.css';

//Declare DropdownFilter, default set to "Student"
const DropdownFilter = () => {
  const [selectedOption, setSelectedOption] = useState("Student");
  const [filteredData, setFilteredData] = useState([]);

  //if filter is set to 'All', display everything, otherwise filter the data
  useEffect(() => {
    if (selectedOption === "All") {
      setFilteredData(ChatData);
    } else {
      setFilteredData( 
        ChatData.filter((item) => item.message === selectedOption)
      );
    }
  }, [selectedOption]);

  const handleDropdownChange = (e) => {
    setSelectedOption(e.target.value);
  };

  //filter the unique data
  const categories = [
    "All",
    ...new Set(ChatData.map((item) => item.message)),
  ]; 

  return (
    <div>
      { /* The filter event, unique values based on the user experience type */}
      <select onChange={handleDropdownChange} value={selectedOption}>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      { /* What appears after the filter event */}
        <pre class="filter">
        {filteredData.map((item) => (
            <Chat
                name = {item.name} 
                message = {item.message}                 
                timestamp = {item.timestamp} 
                profilePic = {item.profilePic} />
        ))}
        </pre>
      
    </div>
  );
};

export default DropdownFilter;
