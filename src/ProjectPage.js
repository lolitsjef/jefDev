import React from 'react';
import './styles.css';
import "wired-elements";
import Canvas from './Canvas';
import rough from 'roughjs/bundled/rough.esm.js';

function App() {

  const chalk = 'rgb(245,245,245)';
  const draw = (context, count) => {
    context.clearRect(0,0, context.canvas.width, context.canvas.height)
    context.fillStyle = chalk;
    const rc = rough.canvas(context.canvas);
    const delta = count * 0.1 % 800;

    rc.rectangle(10 + delta, 50, 100, 100, {
      roughness: 1,
      strokeWidth: 3,
      stroke: chalk,
      fill: chalk, 
      hachureAngle: 60, 
      hachureGap: 10
    });
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
