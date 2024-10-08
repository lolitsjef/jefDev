import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "wired-elements";
import './styles.css';
import Homepage from './Homepage';
import Project from './ProjectPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<Router>
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/project" element={<Project />} />
    </Routes>
  </Router>,);

