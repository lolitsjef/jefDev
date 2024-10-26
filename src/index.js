import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "wired-elements";
import './styles.css';
import Homepage from './Homepage';
import Project from './ProjectPage';
import FallingSand from './FallingSand';
import MazeSolver from './MazeSolver';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<Router>
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/FallingSand" element={<FallingSand />} />
      <Route path="/MazeSolver" element={<MazeSolver />} />
    </Routes>
  </Router>,);

