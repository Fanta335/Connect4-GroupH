// import { Route, Routes } from "react-router-dom";

import React, { useState } from "react";

import { createTheme } from "@mui/material";

import { ThemeProvider } from "@emotion/react";

import Container from "./Container";

const App = () => {
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
};

export default App;
