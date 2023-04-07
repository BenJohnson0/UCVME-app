import React, { useState, useEffect, Component } from "react";
import { ChatData } from "./ChatData";
import Chat from './Chat.js';
import './ChatFilter.css';

const DropdownFilter = () => {
  const [selectedOption, setSelectedOption] = useState("Student");
  const [filteredData, setFilteredData] = useState([]);

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

  const categories = [
    "All",
    "Student",
    ...new Set(ChatData.map((item) => item.message)),
  ]; 

  return (
    <div>
      <select onChange={handleDropdownChange} value={selectedOption}>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      
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
