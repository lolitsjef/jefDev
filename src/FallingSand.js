import React from 'react';
import './styles.css';
import "wired-elements";
import Canvas from './Canvas';
import rough from 'roughjs/bundled/rough.esm.js';

function App() {

  const chalk = 'rgb(245,245,245)';
  const grainSize = 50;

    const w = 800 / grainSize;
    const h = 400 /grainSize;

    const buckets = [];

    for (let i = 0; i < w; i++) {
      buckets[i] = [];
      for (let j = 0; j < h; j++) {
        buckets[i][j] = 0;
      }
    }
    buckets[1][1] = 1;
    buckets[1][2] = 1;
    buckets[0][2] = 1;
    buckets[2][0] = 1;




  const draw = async (context, count) => {
    context.clearRect(0,0, context.canvas.width, context.canvas.height)
    const rc = rough.canvas(context.canvas);

    for(var k = 0; k < w; k++)
    {
      for(var i = h - 2; i >= 0; i--)
        {
          if(buckets[i][k] == 1 && buckets[i+1][k] == 0)
          {
            buckets[i+1][k] = 1;
            buckets[i][k] = 0;
          }
        }
    }
    


    // Draw to canvas
    for(var k = 0; k < w; k++)
    {
      for(var i = 0; i < h; i++)
        {
          if(buckets[i][k] == 1)
          {
            rc.rectangle(k*grainSize, grainSize*i,grainSize,grainSize, 
              {
              fill: chalk,
              stroke: chalk,
              }
            )
          }
          else
          {
            rc.rectangle(k*grainSize, grainSize*i,grainSize,grainSize, 
              {
              stroke: chalk,
              }
            )
          }
        }
    }
    

  }


  return (
    <div>
      <wired-link href="/">
        <h2>jefdev</h2>
      </wired-link>
      <div className= "project-wapper">
        <main>
            <h1>Falling Sand</h1>
            <h5>October 13, 2024</h5>

            {/* Canvas */}
            <wired-card elevation="3" roughness = "1">
            <Canvas draw = {draw} width = "800" height = "400"/>           
            </wired-card>


            {/* Toggles and inputs for project */}
            <section>

            </section>


            {/* Links */}
            <section>

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
