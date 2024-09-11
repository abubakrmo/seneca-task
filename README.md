<h1> Seneca Task </h1>
An interactive toggle-based quiz where users select the correct answers from pairs of options. The game provides real-time feedback on the correctness of the selections, and the background and toggle colors change dynamically based on the user's progress.

<h1> Features </h1>
<ul>
  <li>Toggle-Based Interaction: Users can select the correct answer by toggling between two or more options.</li>
  <li>Real-Time Feedback: Immediate feedback is provided without needing to submit answers.</li>
  <li>Dynamic Background & Toggle Colors: The background and toggle colors change in proportion to how correct the user's answers are, creating a visually pleasing and engaging experience.</li>
  <li>Responsive Design: The UI is fully responsive, adapting to screen sizes as small as 320px.</li>
</ul>

<h1>Technologies Used</h1>
<ul>
  <li>React</li>
  <li>TypeScript</li>
  <li>CSS</li>
</ul>

<h1>Setup Instructions</h1> 

1. Clone the repo
   ```sh
   git clone https://github.com/abubakrmo/seneca-task.git
   ```
2. Navigate into project directory
   ```sh
   cd seneca-task
   ```
3. Install the necessary dependencies
   ```sh
   npm install
   ```
4. Start the development server
   ```sh
   npm start
   ```
<h1>Project structure</h1>
<ul>
  <li>ToggleGame.tsx: Main component for rendering the game and managing the state.</li>
  <li>Toggle.tsx: Reusable toggle switch component for displaying and interacting with the options.</li>
  <li>questions.ts: Contains the list of questions, options, and correct answers. Also includes a utility function for shuffling the options.</li>
</ul>

<h1>Assumptions and Limitations</h1>
<ul>
  <li>
    User Interaction: It is assumed that the user has basic knowledge of how to interact with toggle switches and expects real-time feedback without needing to click a "submit" button.
  </li>
  <li>
    Screen Sizes: The application assumes that users may access it on various devices, from mobile phones to large desktop screens, and thus the layout is responsive for screen sizes down to 320px.
  </li>
  <li>
    Correctness Check: The logic assumes that only fully correct answers are considered successful and locks the game once all correct answers are selected.
  </li>
  <li>
    Static Data: Questions and their correct answers are predefined and hardcoded into the application. The user will be interacting with a static set of questions unless updated in the code.
  </li>
</ul>

<h1>Future Improvement</h1>
<ul>
  <li>Dynamic questions from an external API.</li>
  <li>Implement a scoring system to track the user’s performance over multiple rounds.</li>
</ul>



