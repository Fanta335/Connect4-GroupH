import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import React from "react";
import Home from "./pages/Home.js";
import Settings from "./pages/Settings";
import GameDisplayPage from "./pages/GameDisplayPage";
import Header from "./components/Header";

const Container = () => {
  // Home.js
  const [gameMode, setGameMode] = useState("player");
  const [cpuStrength, setCpuStrength] = useState("easy");
  // Settings.js
  const [borderSizeHeight, setBorderSizeHeight] = useState(6);
  const [borderSizeWidth, setBorderSizeWidth] = useState(7);
  const [victoryCondition, setVictoryCondition] = useState(4);
  const [playerName1, setPlayerName1] = useState("Player1");
  const [playerName2, setPlayerName2] = useState("Player2");

  const handleInputGameModeAndCpuStrengthChange = (event) => {
    const name = event.target.name;
    if (name === "gameMode") {
      setGameMode(event.target.value);
    } else if (name === "cpuStrength") {
      setCpuStrength(event.target.value);
    }
  };

  const handleInputPlayerNameChange = (event) => {
    const name = event.target.name;
    if (name === "playerName1") {
      setPlayerName1(event.target.value);
    } else if (name === "playerName2") {
      setPlayerName2(event.target.value);
    }
  };

  const handleInputNumberChange = (event) => {
    const min = parseInt(event.target.min);
    const max = parseInt(event.target.max);
    let tempValue = "";
    if (event.target.value !== "") {
      tempValue = parseInt(event.target.value);
    }
    if (tempValue > max || tempValue < min) {
      return;
    }
    const name = event.target.name;
    if (name === "borderSizeHeight") {
      setBorderSizeHeight(tempValue);
    } else if (name === "borderSizeWidth") {
      setBorderSizeWidth(tempValue);
    } else if (name === "victoryCondition") {
      setVictoryCondition(tempValue);
    }
  };

  return (
    <>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <Home gameMode={gameMode} cpuStrength={cpuStrength} onChange={handleInputGameModeAndCpuStrengthChange} />
          }
        ></Route>
        <Route
          path="/settings"
          element={
            <Settings
              borderSizeHeight={borderSizeHeight}
              borderSizeWidth={borderSizeWidth}
              victoryCondition={victoryCondition}
              playerName1={playerName1}
              playerName2={playerName2}
              onPlayerNameChange={handleInputPlayerNameChange}
              onNumberChange={handleInputNumberChange}
            />
          }
        ></Route>
        <Route
          path="/game"
          element={
            <GameDisplayPage
              borderSizeHeight={borderSizeHeight}
              borderSizeWidth={borderSizeWidth}
              victoryCondition={victoryCondition}
              playerName1={playerName1}
              playerName2={playerName2}
              gameMode={gameMode}
            />
          }
        ></Route>
      </Routes>
    </>
  );
};

export default Container;
