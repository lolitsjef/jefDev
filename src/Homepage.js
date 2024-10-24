import React from 'react';
import './styles.css';
import "wired-elements";

function App() {
  return (
      <main>
          <wired-link href="/FallingSand" class = "FallingSand">
            <h2>Falling Sand</h2>
          </wired-link>
          <wired-link href="https://www.youtube.com/@jefDev" class = "title">
            <h1>jefDev</h1>
          </wired-link>
        </main>    
  );
}

export default App;
