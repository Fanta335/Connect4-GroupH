// import { Route, Routes } from "react-router-dom";

import { createTheme } from "@mui/material";
import React, { useState } from "react";
// import Home from "./pages/Home.js";
// import Settings from "./pages/Settings";
// import GameDisplayPage from "./pages/GameDisplayPage";
// import Header from "./components/Header";
import Container from "./Container";
import { ThemeProvider } from "@emotion/react";
function App() {
  const [darkMode, setDarkMode] = useState(false);
  const darkTheme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  const defaultTheme = createTheme();
  return (
    <ThemeProvider theme={darkMode ? darkTheme : defaultTheme}>
      <Container darkMode={darkMode} setDarkMode={setDarkMode} />
    </ThemeProvider>
  );
}

export default App;
