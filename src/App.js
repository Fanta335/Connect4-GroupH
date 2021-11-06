import { Route, Routes} from 'react-router-dom';

import React from 'react';
import Home from './pages/Home.js';
import Settings from './pages/Settings';
import GameDisplayPage from './pages/GameDisplayPage';
import Header from './components/Header';
function App(){
  return(
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/settings" element={<Settings />}></Route>
        <Route path="/game" element={<GameDisplayPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
