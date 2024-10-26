import React from 'react';
import './styles.css';
import "wired-elements";
import Canvas from './Canvas';
import rough from 'roughjs/bundled/rough.esm.js';

function App() {
  const chalk = 'rgb(245,245,245)';

  var grainSize = 80;
  const w = 800 / grainSize;
  const h = 400 / grainSize;

  let isDragging = false;
  const mousePosition = { x: 0, y: 0, screenX: 0, screenY: 0};

  var buckets = Array.from({ length: w }, () => Array(h).fill(0));

  const reset = () => 
  {
    buckets = Array.from({ length: w }, () => Array(h).fill(0));
  }

  const draw = async (context, count) => {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    const rc = rough.canvas(context.canvas);

    // Solve Maze





    // Draw to canvas
    for (let x = 0; x < w; x++) 
    {
      for (let y = 0; y < h; y++) 
      {
          rc.rectangle(x * grainSize, grainSize * y, grainSize, grainSize, {
            stroke: chalk,
            roughness: 2,
            strokeWidth: 0.5
          });
      }
    }

    if (mousePosition.x >= 0 && mousePosition.x < w && mousePosition.y >= 0 && mousePosition.y < h) 
      {
        rc.circle(mousePosition.screenX, mousePosition.screenY, grainSize, {
          fill: chalk,
          stroke: chalk,
          hachureGap: 3,
          roughness: 1,
          strokeWidth: 3,
        });
      }
      

  };

  const handleMouseDown = (e) => 
  {
    isDragging = true;
    updateMousePosition(e);
  };

  const handleMouseMove = (e) => 
  {
    updateMousePosition(e);
  };

  const handleMouseUp = () => 
  {
    isDragging = false;
  };

  const updateMousePosition = (e) => 
  {
    const rect = e.target.getBoundingClientRect();
    mousePosition.x = Math.floor((e.clientX - rect.left) / grainSize);
    mousePosition.y = Math.floor((e.clientY - rect.top) / grainSize);
    mousePosition.screenX = (e.clientX - rect.left);
    mousePosition.screenY = (e.clientY - rect.top);
  };

  return (
    <div>
      <wired-link href="/" class = "backLink">
        <h2>jefDev</h2>
      </wired-link>
      <div className="project-wapper">
        <main>
          <h1>Maze Solver</h1>

          {/* Canvas */}
          <wired-card elevation="3" roughness="1">
            <Canvas 
              draw={draw} 
              sleepDuration = {20}
              width="800" 
              height="400"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
            />           
          </wired-card>

          {/* Toggles and inputs for project */}
          <section>
            <div className = "controls">
            <wired-button onClick = {reset}>Reset</wired-button>
            <wired-slider id = "grainSlider" value = "2" min = "1" max = "10"> </wired-slider>
            </div>

          </section>

          {/* Links */}
          <section>
          <wired-card>
            <wired-link href="https://github.com/lolitsjef/jefDev/blob/main/src/FallingSand.js">Source Code</wired-link>
          </wired-card>
          <wired-card>
            <wired-link href="https://youtu.be/5MWUf2b7UkY?si=BvHsa6XuVzRRiSDI">YouTube Video</wired-link>
          </wired-card>
          </section>

          {/* Small project writeup */}
          <section>
            <p>
            </p>
          </section>
        </main>
      </div>
    </div>
  );
}

export default App;
