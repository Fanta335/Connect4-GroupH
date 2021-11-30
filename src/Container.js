import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";

import Header from "./components/Header";
import { HowToPlayModal } from "./components/Modal";
import GameDisplayPage from "./pages/GameDisplayPage";
import Home from "./pages/Home";
import Settings from "./pages/Settings";

const Container = (props) => {
  // Home.js
  const [gameMode, setGameMode] = useState("player");
  const [cpuStrength, setCpuStrength] = useState("easy");
  // Settings.js
  const [boardSizeHeight, setBoardSizeHeight] = useState(6);
  const [boardSizeWidth, setBoardSizeWidth] = useState(7);
  const [victoryCondition, setVictoryCondition] = useState(4);
  const [timeMinControl, setTimeMinControl] = useState(20);
  const [timeSecControl, setTimeSecControl] = useState(0);
  const [playerName1, setPlayerName1] = useState("Player1");
  const [playerName2, setPlayerName2] = useState("Player2");
  const [playerColor1, setPlayerColor1] = useState("red");
  const [playerColor2, setPlayerColor2] = useState("yellow");
  const [howToPlayModalOpen, setHowToPlayModalOpen] = useState(false);

  const handleHowToPlayModalOpen = () => {
    setHowToPlayModalOpen(true);
  };

  const handleHowToPlayModalClose = () => {
    setHowToPlayModalOpen(false);
  };

  const handleInputGameModeAndCpuStrengthChange = (event) => {
    const name = event.target.name;
    if (name === "gameMode") {
      setGameMode(event.target.value);
    } else if (name === "cpuStrength") {
      setCpuStrength(event.target.value);
    }
  };

  const handleInputChange = (event) => {
    const name = event.target.name;
    if (name === "playerName1") {
      setPlayerName1(event.target.value);
    } else if (name === "playerName2") {
      setPlayerName2(event.target.value);
    } else if (name === "playerColor1") {
      setPlayerColor1(event.target.value);
    } else if (name === "playerColor2") {
      setPlayerColor2(event.target.value);
    }
  };

  const handleInputNumberChange = (event) => {
    const min = parseInt(event.target.min, 10);
    const max = parseInt(event.target.max, 10);
    let tempValue = "";
    if (event.target.value !== "") {
      tempValue = parseInt(event.target.value, 10);
    }
    if (tempValue > max || tempValue < min) {
      return;
    }
    const name = event.target.name;
    if (name === "boardSizeHeight") {
      setBoardSizeHeight(tempValue);
    } else if (name === "boardSizeWidth") {
      setBoardSizeWidth(tempValue);
    } else if (name === "victoryCondition") {
      setVictoryCondition(tempValue);
    } else if (name === "timeMinControl") {
      setTimeMinControl(tempValue);
    } else if (name === "timeSecControl") {
      setTimeSecControl(tempValue);
    }
  };

  return (
    <>
      <Header
        darkMode={props.darkMode}
        setDarkMode={props.setDarkMode}
        gameMode={gameMode}
        timeMinControl={timeMinControl}
        timeSecControl={timeSecControl}
        handleHowToPlayModalOpen={handleHowToPlayModalOpen}
      />
      <HowToPlayModal handleClose={handleHowToPlayModalClose} open={howToPlayModalOpen} />
      <Routes>
        <Route
          path="/"
          element={
            <Home gameMode={gameMode} cpuStrength={cpuStrength} onChange={handleInputGameModeAndCpuStrengthChange} />
          }
        />
        <Route
          path="/settings"
          element={
            <Settings
              boardSize={[boardSizeHeight, boardSizeWidth]}
              victoryCondition={victoryCondition}
              players={[playerName1, playerName2]}
              colors={[playerColor1, playerColor2]}
              timeMinControl={timeMinControl}
              timeSecControl={timeSecControl}
              handleInputChange={handleInputChange}
              onNumberChange={handleInputNumberChange}
            />
          }
        />
        <Route
          path="/game"
          element={
            <GameDisplayPage
              boardSize={[boardSizeWidth, boardSizeHeight]}
              victoryCondition={victoryCondition}
              players={[playerName1, playerName2]}
              colors={[playerColor1, playerColor2]}
              timeMinControl={timeMinControl}
              timeSecControl={timeSecControl}
              gameMode={gameMode}
              cpuStrength={cpuStrength}
              howToPlayModalOpen={howToPlayModalOpen}
              handleHowToPlayModalClose={handleHowToPlayModalClose}
            />
          }
        />
      </Routes>
    </>
  );
};

export default Container;
