
import MainContainer from './components/container';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState,useEffect } from 'react';
import Favorites from './components/myshelf';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainContainer/>}/>
        <Route path="/myshelf" element={<Favorites/>}/>
      </Routes>
    </Router>
   
  );
}

export default App;
