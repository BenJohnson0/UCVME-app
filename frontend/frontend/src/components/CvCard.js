import React, { useState } from "react";
import { motion } from "framer-motion";
import "./CvCard.css";

const cvData = [
  //this needs to be changd to a DB route instead of static local data, controllers need to be created
  {
    name: "John Doe",
    title: "Software Engineer",
    summary:
      "Experienced software engineer with expertise in React, Node.js, and MongoDB.",
    experience: [
      {
        company: "Software Company",
        position: "Senior Software Engineer",
        duration: "Date",
        responsibilities: ["Did software engineering things"],
      },
      {
        company: "other Software Company",
        position: "Software Engineer",
        duration: "other Date",
        responsibilities: ["Different software engineering things"],
      },
    ],
  },
  {
    name: "Jane Smith",
    title: "Plumber",
    summary: "Experienced plumber with a track record of succesful servicing.",
    experience: [
      {
        company: "Plumbing Company",
        position: "Senior Plumber",
        duration: "Date",
        responsibilities: ["Plumbing Things"],
      },
      {
        company: "other Plumbing Company",
        position: "Plumber",
        duration: "other Date",
        responsibilities: ["more plumbing duties"],
      },
    ],
  },
];

//Card functions
function CvCard() {
  //funcion that handles profile switching 
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentCv = cvData[currentIndex];

  //bound to next button
  const handleNext = () => {
    setCurrentIndex(currentIndex === cvData.length - 1 ? 0 : currentIndex + 1);
  };

  //bound to back button
  const handleBack = () => {
    setCurrentIndex(currentIndex === 0 ? cvData.length - 1 : currentIndex - 1);
  };

  //bound to contact button
  const handleContact = () => {};

  //bound to save button
  const handleSave = () => {};

  //expading div 
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="cvHomeScreen">
      <motion.div
        initial={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          height: "auto",
          width: "250px",
        }}
        animate={{
          height: isOpen ? "auto" : "200px",
          width: isOpen ? "70%" : "300px",
        }}
        onClick={() => setIsOpen(!isOpen)}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="cv-card"
      >
        <div className="cv-card-heading">
          <div className="cv-card-heading-Profile">
            <h2>{currentCv.name}</h2>
            <p>{currentCv.title}</p>
            <p>{currentCv.summary}</p>
          </div>
          {isOpen && (
            //add video play component here 
            <motion.div className="cv-card-heading-Video">
              <h2>{currentCv.name}'s UCVME Video</h2>
            </motion.div>
          )}
        </div>
        {isOpen && (
          <motion.div className="cv-card-experience">
            <motion.h3>Experience</motion.h3>
            {currentCv.experience.map((exp, index) => (
              <div key={index}>
                <motion.h4>
                  {exp.position} at {exp.company}
                </motion.h4>
                <p>{exp.duration}</p>
                <motion.ul>
                  {exp.responsibilities.map((responsibility, index) => (
                    <li key={index}>{responsibility}</li>
                  ))}
                </motion.ul>
              </div>
            ))}
          </motion.div>
        )}
      </motion.div>

      <div className="buttons">
        <button onClick={handleBack}>Back</button>
        <button onClick={handleNext}>Next</button>
        <button onClick={handleContact}>Contact</button>
        <button onClick={handleSave}>Save</button>
      </div>
    </div>
  );
};

export default CvCard;