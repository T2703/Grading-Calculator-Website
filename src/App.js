import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GradeCalculator from './GradeCalculator';
import './App.css';

// The app/website basically this
function App() {
  return (
    <div className="Title">
      <header className="Home-header">
        <p>Calculate My Grades</p>
        <a className='buttonTo' href="/grade-calculator"> Click Me</a>
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
      </Routes>
    </Router>
  );
}

export default Main;
