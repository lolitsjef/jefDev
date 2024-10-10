import React from 'react';
import './styles.css';
import "wired-elements";
import Canvas from './Canvas';
import rough from 'roughjs/bundled/rough.esm.js';

function App() {


  const pxSize = 50;
  const chalk = 'rgb(245,245,245)';
  var iterations = 0;

  const draw = async (context, count) => {
    context.clearRect(0,0, context.canvas.width, context.canvas.height)
    const rc = rough.canvas(context.canvas);

    const w = context.canvas.width / pxSize;
    const h = context.canvas.height / pxSize;

    for(var k = 0; k < w; k++){
      rc.line(k*pxSize, 0, k*pxSize, context.canvas.height, 
        {
        stroke: chalk,
        roughness: 0,
        }); // x1, y1, x2, y2
    }

    for(k = 0; k < h; k++){
      rc.line(0, k*pxSize, context.canvas.width, k*pxSize, 
        {
        stroke: chalk,
        roughness: 0,
        }); // x1, y1, x2, y2
    }

    rc.rectangle(0, Math.min(iterations*pxSize, (h-1)*pxSize), pxSize, pxSize,
      {
        stroke: chalk,
        fill: chalk,
        fillWeight: 2,
        strokeWeight: 2,
      }
    );
    iterations++;
  }


  return (
    <div>
      <wired-link href="/">
        <h2>jefdev</h2>
      </wired-link>
      <div className= "project-wapper">
        <main>
            <h1> Project Name</h1>
            <h5>October 6, 2024</h5>

            {/* Canvas */}
            <wired-card elevation="3" roughness = "1">
            <Canvas draw = {draw} width = "800" height = "400"/>           
            </wired-card>


            {/* Toggles and inputs for project */}
            <section>
              <wired-toggle checked></wired-toggle>          
            </section>


            {/* Links */}
            <section>
              <wired-card>
                <wired-link href="/more.html">Development Video</wired-link>
              </wired-card>
              <wired-card>
                <wired-link href="/more.html">Source Code</wired-link>
              </wired-card>

            </section>


            {/* Small project writeup */}
            <section>
              <p>
              The development of the project commenced with a series of brainstorming sessions aimed at identifying key objectives 
              and defining the overall vision. Team members collaborated closely to outline the project scope, ensuring that all 
              aspects were thoroughly considered. Once the foundational ideas were in place, a detailed timeline was established, 
              breaking down tasks into manageable phases. Each phase was assigned to specific team members, fostering a sense of ownership 
              and accountability. As the project progressed, regular check-ins and feedback loops were implemented to address any 
              challenges that arose and to celebrate milestones. This iterative approach not only enhanced team cohesion but also 
              ensured that the project remained aligned with its original goals, ultimately leading to a successful completion.
              </p>
            </section>
        </main>
      </div>
    </div>

    
  );
}

export default App;
