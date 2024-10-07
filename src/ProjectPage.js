import React from 'react';
import './styles.css';
import "wired-elements";
import Canvas from './Canvas';
function App() {
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
            <wired-card elevation="1" roughness = "5">
            <Canvas width = "800" height = "400"/>           
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
