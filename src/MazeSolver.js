import React from 'react';
import './styles.css';
import "wired-elements";
import Canvas from './Canvas';
import rough from 'roughjs/bundled/rough.esm.js';
import st from 'roughjs/bundled/rough.esm.js';

function App() {
  const chalk = 'rgb(245,245,245)';
  const green = 'rgb(175, 225, 175)';
  const red = 'rgb(170, 74, 68)';
  const blue = 'rgb(137, 207, 240)';


  var grainSize = 40;
  
  let w = 800 / grainSize;
  let h = 400 / grainSize;

  let isDragging = false;
  const mousePosition = { x: 0, y: 0, screenX: 0, screenY: 0};

  let solve = false;
  let solved = false;
  const setSolve = () => 
  {
    solve = true;
  }
  // Queue to store nodes to visit
  class Queue 
  {
    constructor() 
    {
      this.items = {};
      this.frontIndex = 0;
      this.backIndex = 0;
    }
    push(item)
    {
      this.items[this.backIndex] = item;
      this.backIndex++
    }
    pop()
    {
      if(this.frontIndex === this.backIndex) return null;
      const item = this.items[this.frontIndex]
      delete this.items[this.frontIndex];
      this.frontIndex++
      return item;
    }
    isEmpty()
    {
      return this.frontIndex === this.backIndex;
    }
  }
  let start = {x: 0, y: 0};
  let end = {x: w-1, y: h-1};

  let toVisit = new Queue();
  toVisit.push(start);
  
  let dict = new Object();

  // Array to store progress
  var buckets = Array.from({ length: w }, () => Array(h).fill(0));

  buckets[start.x][start.y] = 2;
  buckets[end.x][end.y] = 3;
  const reset = () => 
  {
    handleSliderChange();
    w = 800 / grainSize;
    h = 400 / grainSize;
    isDragging = false;
    buckets = Array.from({ length: w }, () => Array(h).fill(0));
    start = {x: 0, y: 0};
    end = {x: w-1, y: h-1};
    buckets[start.x][start.y] = 2;
    buckets[end.x][end.y] = 3;
    toVisit = new Queue();
    toVisit.push(start);
    solve = false;
    solved = false;
  }

  
  const draw = async (context, count) => 
  {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    const rc = rough.canvas(context.canvas);

    // Solve Maze
    if(!toVisit.isEmpty() && solve && !solved)
    {
      let current = toVisit.pop();
      solve = false;

      //check down
      if(current.y + 1 < h && buckets[current.x][current.y+1] === 0)
      {
        toVisit.push({x:current.x, y:current.y+1});
        buckets[current.x][current.y+1] = 1;
        dict[`${current.x},${current.y+1}`] = {x:current.x, y:current.y};
      }

      //check right
      if(current.x+1 < w && buckets[current.x+1][current.y] === 0)
      {
        toVisit.push({x:current.x+1, y:current.y});
        buckets[current.x+1][current.y] = 1;
        dict[`${current.x+1},${current.y}`] = {x:current.x, y:current.y};
      }

      //check up
      if(current.y-1 >= 0 && buckets[current.x][current.y-1] === 0)
      {
        toVisit.push({x:current.x, y:current.y-1});
        buckets[current.x][current.y-1] = 1;
        dict[`${current.x},${current.y-1}`] = {x:current.x, y:current.y};
      }

      //check left
      if(current.x-1 >=0 && buckets[current.x-1][current.y] === 0)
      {
        toVisit.push({x:current.x-1, y:current.y});
        buckets[current.x-1][current.y] = 1;
        dict[`${current.x-1},${current.y}`] = {x:current.x, y:current.y};
      }

      console.log(dict);


      //Look for solve
      if(current.y + 1 < h && buckets[current.x][current.y+1] === 3)
      {
        dict[`${current.x},${current.y+1}`] = {x:current.x, y:current.y};
        solved = true;
      }

      if(current.x+1 < w && buckets[current.x+1][current.y] === 3)
      {
        solved = true;
        dict[`${current.x+1},${current.y}`] = {x:current.x, y:current.y};
      }

      if(current.y-1 >= 0 && buckets[current.x][current.y-1] === 3)
      {
        dict[`${current.x},${current.y-1}`] = {x:current.x, y:current.y};
        solved = true;
      }

      if(current.x-1 >=0 && buckets[current.x-1][current.y] === 3)
      {
        dict[`${current.x-1},${current.y}`] = {x:current.x, y:current.y};
        solved = true;
      }
    }

    // Show Solution
    if(solved && !(end.x === start.x && end.y === start.y) && solve)
    {
      buckets[end.x][end.y] = 2;
      end = dict[`${end.x},${end.y}`];
    }
    else if(toVisit.isEmpty())
    {
      for (let x = 0; x < w; x++) 
      {
        for (let y = 0; y < h; y++) 
        {
          if(buckets[x][y] === 1)
          {
            buckets[x][y] = 3;
            break;
          }
        }
      }
    }

    // Create Walls
    if (isDragging) 
    {
      if (mousePosition.x >= 0 && mousePosition.x < w && mousePosition.y >= 0 && mousePosition.y < h) 
      {
        buckets[mousePosition.x][mousePosition.y] = -1;
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
            fill: blue,
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
        else if (buckets[x][y] === -1) 
          {
            rc.rectangle(x * grainSize, grainSize * y, grainSize, grainSize, {
              fill: chalk,
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

    // Draw Mouse
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


  const handleSliderChange = () =>
  {
    const temp = parseInt(document.getElementById("grainSlider").value, 20); 
    switch(temp)
    {
      case 1:
        grainSize = 20;
        break;
      case 2:
        grainSize = 40;
        break;
      case 3:
        grainSize = 80;
        break;
      default:
        grainSize = 80;
    }
  }
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
            <wired-button onClick = {setSolve}>Solve</wired-button>
            <wired-slider change = {reset} id = "grainSlider" value = "2" min = "1" max = "3"></wired-slider>
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
