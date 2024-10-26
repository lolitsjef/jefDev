import React from 'react';
import './styles.css';
import "wired-elements";
import Canvas from './Canvas';
import rough from 'roughjs/bundled/rough.esm.js';

function App() {
  const chalk = 'rgb(245,245,245)';
  const green = 'rgb(175, 225, 175)';
  const red = 'rgb(170, 74, 68)';

  var grainSize = 80;
  const w = 800 / grainSize;
  const h = 400 / grainSize;

  let isDragging = false;
  const mousePosition = { x: 0, y: 0, screenX: 0, screenY: 0};

  var buckets = Array.from({ length: w }, () => Array(h).fill(0));
  let start = {x: 0, y: 0};
  let end = {x: w-1, y: h-1};
  const reset = () => 
  {
    buckets = Array.from({ length: w }, () => Array(h).fill(0));
  }

  buckets[start.x][start.y] = 2;
  buckets[end.x][end.y] = 3;

  class Queue {
    constructor() {
      this.items = {};
      this.frontIndex = 0;
      this.backIndex = 0;
    }
    push(item) {
      this.items[this.backIndex] = item;
      this.backIndex++;
    }
    pop() {
      const item = this.items[this.frontIndex];
      delete this.items[this.frontIndex];
      this.frontIndex++;
      return item;
    }
  }

  let toVisit = new Queue();
  toVisit.push(start);



  
  const draw = async (context, count) => 
  {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    const rc = rough.canvas(context.canvas);


    // Create Walls
    if (isDragging) 
    {
      if (mousePosition.x >= 0 && mousePosition.x < w && mousePosition.y >= 0 && mousePosition.y < h) 
      {
        buckets[mousePosition.x][mousePosition.y] = 1;
      }
    }






    // Solve Maze















    // Draw to canvas
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
          else if (buckets[x][y] === 2) 
          {
            rc.rectangle(x * grainSize, grainSize * y, grainSize, grainSize, {
              fill: green,
              fillWeight: 2,
              hachureGap: 3,
              roughness: 1,
              stroke: chalk,
            });
          }
          else if (buckets[x][y] === 3) 
          {
            rc.rectangle(x * grainSize, grainSize * y, grainSize, grainSize, {
              fill: red,
              fillWeight: 2,
              hachureGap: 3,
              roughness: 1,
              stroke: chalk,
            });
          }
          else
          {
            rc.rectangle(x * grainSize, grainSize * y, grainSize, grainSize, {
              roughness: 2,
              stroke: chalk,
            });
          }
        }
      }

    if (mousePosition.screenX > 5 && mousePosition.screenX < 795 && mousePosition.screenY > 5 && mousePosition.screenY < 395) 
      {
        rc.circle(mousePosition.screenX, mousePosition.screenY, grainSize*3/4, {
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
            <wired-link href="">Source Code</wired-link>
          </wired-card>
          <wired-card>
            <wired-link href="">YouTube Video</wired-link>
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
