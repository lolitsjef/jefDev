import React from 'react';
import './styles.css';
import "wired-elements";

function App() {
  return (
      <main>
          <wired-link href="/project" class = "Project">
          <h2>Project</h2>
          </wired-link>
          <div class = "title">
            <h1>jefDev</h1>
          </div>
        </main>    
  );
}

export default App;
