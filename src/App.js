import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GradeCalculator from './GradeCalculator';
import GpaCalculator from './GpaCalculator';
import './App.css';

// The app/website basically this
function App() {
  return (
    <div className="Title">
      <header className="Home-header">
        <p>Calculate My Grades</p>
        <a className='buttonTo' href="/grade-calculator"> Grade Calculator</a>
        <a className='buttonTo' href="/gpa-calculator"> Gpa Calculator</a>
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
