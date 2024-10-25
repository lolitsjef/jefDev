import React from 'react';
import './styles.css';
import "wired-elements";
import Canvas from './Canvas';
import rough from 'roughjs/bundled/rough.esm.js';

function App() {
  const chalk = 'rgb(245,245,245)';
  const maxSounds = 5; 
  const minTimeBetweenSounds = 50; 
  let sounds = []; 
  let lastSoundTime = 0; 

  var grainSize = 20;
  const w = 720 / grainSize;
  const h = 1280 / grainSize;
  var depth = 5;
  let isDragging = false;
  let soundEnabled = false;
  const mousePosition = { x: 0, y: 0, screenX: 0, screenY: 0};


  var buckets = Array.from({ length: w }, () => Array(h).fill(0));

  const initializeMounds = () => {
    const centerXStart = Math.floor(w / 3);
    const centerXEnd = Math.floor(2 * w / 3);
    const centerYStart = Math.floor(h / 3);
    const centerYEnd = Math.floor(2 * h / 3);

    for (let x = centerXStart; x < centerXEnd; x++) 
    {
      for (let y = centerYStart; y < centerYEnd; y++) 
      {
        if (Math.random() > 0.5) 
        { 
          buckets[x][y] = 1;
        }
      }
    }
  };
  initializeMounds(); 

  const reset = () => 
  {
    buckets = Array.from({ length: w }, () => Array(h).fill(0));
  }

  const draw = async (context, count) => {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    const rc = rough.canvas(context.canvas);
    rough.newSeed(0);
    depth = parseInt(document.getElementById("depthSlider").value, 10); 
    soundEnabled = document.getElementById("sound").checked;
    let played = false;


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
          else //play sound on setteling
          {
            buckets[x][y] = 2;
            if(!played)
            {
              playSound();
              played = true;
            }
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
        buckets[mousePosition.x][mousePosition.y] = Math.random() > 0.34 ? 1 :  buckets[mousePosition.x][mousePosition.y];
        buckets[mousePosition.x+1][mousePosition.y] = Math.random() > 0.35 ? 1 :  buckets[mousePosition.x][mousePosition.y];
        buckets[mousePosition.x][mousePosition.y+1] = Math.random() > 0.35 ? 1 :  buckets[mousePosition.x][mousePosition.y];
        buckets[mousePosition.x+1][mousePosition.y+1] = Math.random() > 0.35 ? 1 :  buckets[mousePosition.x][mousePosition.y];
        buckets[mousePosition.x][mousePosition.y] = Math.random() > 0.35 ? 1 :  buckets[mousePosition.x][mousePosition.y];
        buckets[mousePosition.x-1][mousePosition.y] = Math.random() > 0.35 ? 1 :  buckets[mousePosition.x][mousePosition.y];
        buckets[mousePosition.x][mousePosition.y-1] = Math.random() > 0.35 ? 1 :  buckets[mousePosition.x][mousePosition.y];
        buckets[mousePosition.x-1][mousePosition.y-1] = Math.random() > 0.35 ? 1 :  buckets[mousePosition.x][mousePosition.y];
      }
    }

    //rain
    if(document.getElementById("rain").checked)
    {
      for (let x = 0; x < w; x++)
      {
        if(Math.random() > 0.95 && buckets[x][0] === 0)
        buckets[x][0] = 1;
      }
    }
      

    // Draw to canvas
    for (let x = 0; x < w; x++) 
    {
      for (let y = 0; y < h; y++) 
      {
        if (buckets[x][y] > 0) 
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

  const playSound = () => {
    const currentTime = Date.now(); // Get current time in milliseconds
    // Check if we can play a new sound
    if (soundEnabled && sounds.length < maxSounds && (currentTime - lastSoundTime > minTimeBetweenSounds)) {
      const audio = new Audio(process.env.PUBLIC_URL + '/sounds/sand.mp3');
      sounds.push(audio); // Add new audio instance to the array

      audio.play().then(() => {
        lastSoundTime = Date.now(); // Update the last sound time
      }).catch((error) => {
        console.log("Error playing sound:", error);
      });

      audio.onended = () => {
        sounds = sounds.filter(snd => snd !== audio); // Remove audio instance from the array when it ends
      };
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
          <h1>Falling Sand</h1>

          {/* Canvas */}
          <wired-card elevation="3" roughness="1">
            <Canvas 
              draw={draw} 
              sleepDuration = {0}
              width="720" 
              height="1280"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
            />           
          </wired-card>

          {/* Toggles and inputs for project */}
          <section>
            <div className = "controls">
            <wired-button onClick = {reset}>Reset</wired-button>
            <wired-toggle id = "rain">Rain</wired-toggle>
            <wired-toggle id = "sound">Sound</wired-toggle>
            <wired-slider id = "depthSlider" value = "2" min = "1" max = "10"> </wired-slider>
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
              A simple project to simulate falling sand. Click and drag to spawn sand. Press "Reset" to clear all sand.
              Use the slider to change the steepness of the piles created by the sand. This project was inspired by 
              The Coding Train and Jason McGhee.
            </p>
          </section>
        </main>
      </div>
    </div>
  );
}

export default App;
