import React, { useState, useEffect } from "react";

import "normalize.css";
import styled from "styled-components";

import "./index.css";
import { timezones as tz } from "./data/timezones";

import LocationDisplay from "./components/LocationDisplay";
import PlaceInput from "./components/PlaceInput";
import CountdownTimer from "./components/CountDownTimer"

function lsTest() {
  var test = "test";
  try {
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (e) {
    return false;
  }
}


const StyledInput = styled.input`
  outline: none;
  box-sizing: border-box;
  background-color: rgba(125, 125, 125, 0.1);
  border: none;
  border-bottom: 2px solid #282828;
  transition: border-bottom-color 0.2s ease-in;
  padding: 1rem;
  width: 100%;
  font-size: 2rem;
  color: white;
  font-weight: 400;

  &:focus {
    /* background: rgba(255, 255, 255, 0.2); */
    border-bottom-color: #4179a6;
    &::placeholder {
      opacity: 0;
    }
  }
  &::placeholder {
    transition: opacity 0.2s ease-in;
    color: #303030;
  }
`;
const Title = styled.h1`
  color: #e3e3e3;
  font-weight: lighter;
  font-size: 2em;
  text-align: center;
`;

const SubTitle = styled.h1`
  color: #e3e3e3;
  font-weight: lighter;
  font-size: 1.5em;
  text-align: center;
`;

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
  margin: 7% 1% 1% 1%;
  &:hover {
    color: white;
  }
`;


const Container = styled.section`
  margin: 0 auto;
  max-width: 800px;
  padding: 2em;
`;



const Header = styled.header`
  opacity: ${(props) => (props.showHeader ? 1 : 0)};
  transition: opacity 1s ease-in;
`;

export default function App() {
  const [clocks, setClocks] = useState([]);
  const [showHeader, setShowHeader] = useState(true);
  const [timers, setTimers] = useState([]);
  const [newTimerStartTime, setNewTimerStartTime] = useState(60);

  useEffect(() => {
    if (lsTest() === true) {
      const hasClocksInStorage =
        localStorage.getItem("clocks") &&
        JSON.parse(localStorage.getItem("clocks")).length > 0;
      const storedClocks = hasClocksInStorage
        ? JSON.parse(localStorage.getItem("clocks"))
        : null;
      if (hasClocksInStorage) {
        setClocks(storedClocks);
      }
    } else {
      console.log("localStorage not available");
    }
  }, []);

  useEffect(() => {
    if (lsTest() === true) {
      localStorage.setItem("clocks", JSON.stringify(clocks));
    } else {
      console.log("localStorage not available");
    }
  }, [clocks]);

  const addClock = (city) => {
    setClocks([city, ...clocks]);
  };

  const removeClock = (id) => {
    setClocks(
      clocks.filter((city) => city.fields.geonameid !== parseInt(id, 10))
    );
  };


  const handleStartTimer = () => {
    setTimers((prevTimers) => [
      ...prevTimers,
      { id: Date.now(), startTime: newTimerStartTime },
    ]);
  };

  const handleRemoveTimer = (timerId) => {
    setTimers((prevTimers) => prevTimers.filter((timer) => timer.id !== timerId));
  };


  return (
    <div className="App">
      <Container>
        <Header showHeader={showHeader}>
          <Title>World Clock</Title>
          <PlaceInput addClock={addClock} />
        </Header>
        {clocks &&
          clocks.map((city) => (
            <LocationDisplay
              key={city.id}
              removeClock={removeClock}
              city={city}
            />
          ))}


    <div>
      <Title>Count - Down Timers</Title>
      <div style={{display:"flex"}}>
        <SubTitle>
          New Timer Duration (seconds):
          <StyledInput
            type="number"
            value={newTimerStartTime}
            onChange={(e) => setNewTimerStartTime(e.target.value)}
          />
        </SubTitle>
        <StyledButton onClick={handleStartTimer}>Start Timer</StyledButton>
      </div>
      <div>
        {timers.map((timer) => (
          <CountdownTimer
            key={timer.id}
            startTime={timer.startTime}
            onRemove={() => handleRemoveTimer(timer.id)}
          />
        ))}
      </div>
    </div>
      </Container>
    </div>
  );
}
