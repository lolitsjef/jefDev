import React from 'react';
import './styles.css';
import "wired-elements";
import Canvas from './Canvas';
import rough from 'roughjs/bundled/rough.esm.js';

function App() {
  const chalk = 'rgb(245,245,245)';
  var grainSize = 10;

  const w = 800 / grainSize;
  const h = 400 / grainSize;
  var depth = 5;
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
    rough.newSeed(0);
    depth = parseInt(document.getElementById("depthSlider").value, 10); 


    // Update Buckets
    for (let x = 0; x < w; x++) 
    {
      for (let y = h - 2; y >= 0; y--) 
      {
        if (buckets[x][y] === 1) 
        {
          if (buckets[x][y + 1] === 0) 
          {
            buckets[x][y + 1] = 1;
            buckets[x][y] = 0;
            continue;
          } 
          else if (x + 1 < w && buckets[x + 1][y + depth] === 0 && y + depth < h) 
          {
            buckets[x + 1][y + depth] = 1;
            buckets[x][y] = 0;
            continue;
          }
          else if (x - 1 >= 0 && buckets[x - 1][y + depth] === 0 && y + depth < h) 
          {
            buckets[x - 1][y + depth] = 1;
            buckets[x][y] = 0;
            continue;
          }
        }
      }
    }

    // Add spawned Sand
    if (isDragging) 
    {
      if (mousePosition.x > 0 && mousePosition.x < w-1 && mousePosition.y > 0 && mousePosition.y < h-1) 
      {
        // Assign random 0 or 1 to each bucket position
        buckets[mousePosition.x][mousePosition.y] = Math.random() > 0.34 ? 1 : 0;
        buckets[mousePosition.x+1][mousePosition.y] = Math.random() > 0.35 ? 1 : 0;
        buckets[mousePosition.x][mousePosition.y+1] = Math.random() > 0.35 ? 1 : 0;
        buckets[mousePosition.x+1][mousePosition.y+1] = Math.random() > 0.35 ? 1 : 0;
        buckets[mousePosition.x][mousePosition.y] = Math.random() > 0.35 ? 1 : 0;
        buckets[mousePosition.x-1][mousePosition.y] = Math.random() > 0.35 ? 1 : 0;
        buckets[mousePosition.x][mousePosition.y-1] = Math.random() > 0.35 ? 1 : 0;
        buckets[mousePosition.x-1][mousePosition.y-1] = Math.random() > 0.35 ? 1 : 0;
      }
    }
      

    // Draw to canvas
    for (let x = 0; x < w; x++) 
    {
      for (let y = 0; y < h; y++) 
      {
        if (buckets[x][y] === 1) 
        {
          rc.rectangle(x * grainSize, grainSize * y, grainSize, grainSize, {
            fill: chalk,
            fillWeight: 2,
            hachureGap: 3,
            roughness: 1,
            stroke: chalk,
          });
        }
      }
    }

    if (mousePosition.x > 0 && mousePosition.x < w-1 && mousePosition.y > 0 && mousePosition.y < h-1) 
      {
        rc.circle(mousePosition.screenX, mousePosition.screenY, 3* grainSize, {
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
      <wired-link href="/">
        <h2>jefdev</h2>
      </wired-link>
      <div className="project-wapper">
        <main>
          <h1>Falling Sand</h1>
          <h5>October 13, 2024</h5>

          {/* Canvas */}
          <wired-card elevation="3" roughness="1">
            <Canvas 
              draw={draw} 
              sleepDuration = {8}
              width="800" 
              height="400"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
            />           
          </wired-card>

          {/* Toggles and inputs for project */}
          <section>
            <div class = "controls">
            <wired-button onClick = {reset}>Reset</wired-button>
            <wired-slider id = "depthSlider" value = "2" min = "1" max = "10"> </wired-slider>
            </div>

          </section>

          {/* Links */}
          <section></section>

          {/* Small project writeup */}
          <section>
            <p></p>
          </section>
        </main>
      </div>
    </div>
  );
}

export default App;
