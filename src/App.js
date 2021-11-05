import React from 'react';
import Home from './pages/Home.js';
import Settings from './pages/Settings';
import GameDisplayPage from './pages/GameDisplayPage';
function App(){
  return(
    <div>
      <Home />
      <Settings />
      <GameDisplayPage />
    </div>
  );
}

export default App;