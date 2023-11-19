import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GradeCalculator from './GradeCalculator';
import GpaCalculator from './GpaCalculator.js';
import './App.css';

// The app/website basically this
function App() {
  return (
    <div className="Title">
      <header className="Home-header">
        <p>Calculate My Grades Or GPA</p>
        <div className="buttonContainer">
          <a className='buttonTo' href="/grade-calculator">
            <img
              src="/grade-calc.png"
              alt="Grade Calculator Icon"
              style={{ width: '300px', height: '300px' }}
            />
            Grade Calculator
          </a>
          <a className='buttonTo' href="/gpa-calculator">
            <img
              src="/gpa-calc.png"  
              alt="GPA Calculator Icon"
              style={{ width: '300px', height: '300px' }}
            />
            GPA Calculator
          </a>
        </div>
        <p>
          Ever needed to calculate your grade or GPA quickly? 
          <br />
          You have come to the right place.
          <br />
          Just use one of the calculators for your grading needs.
        </p>
      </header>
    </div>
  );
}

function Main() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/grade-calculator" element={<GradeCalculator />} />
        <Route path="/gpa-calculator" element={<GpaCalculator />} />
      </Routes>
    </Router>
  );
}

export default Main;
