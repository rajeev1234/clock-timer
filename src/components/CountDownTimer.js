import React, { useState, useEffect } from 'react';
import styled from "styled-components";


const StyledButton = styled.button`
  outline: none;
  border: none;
  background: none;
  background-color: #282828; 
  font-size: 1.5rem;
  padding: 1rem;
  color: lightgray;
  border-bottom: 1px solid #282828;
  width: 100%;
  text-align: center;
  cursor: pointer;
  height: min-content;
  margin: 3% 1% 0% 1%;
  &:hover {
    color: white;
  }
`;

const Title = styled.h1`
  color: #e3e3e3;
  font-weight: lighter;
  font-size: 1.5em;
  text-align: center;
  width: 90%;
  margin: 3% 0 0 0;
  background-color: steelblue;
  padding: 1rem;
`;
// Countdown Timer Component
const CountdownTimer = ({ startTime, onRemove }) => {
  const [timeLeft, setTimeLeft] = useState(startTime);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div style={{display:"flex"}}>
      <Title>{`Time Left: ${timeLeft}s`}</Title>
      <StyledButton onClick={onRemove}>Remove Timer</StyledButton>
    </div>
  );
};

export default CountdownTimer;
