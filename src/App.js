import './App.css';
import './App.css';
import { useState } from 'react';
import Search from './components/Search';

// Constants
const CURRENT_YEAR = new Date().getFullYear();
const MIN_YEAR = 1824;
const MAX_YEAR = CURRENT_YEAR;

const DEFAULT_YEAR_RANGE_LENGTH = 10;

function App() {
  // States
  const [searchTerm, setSearchTerm] = useState('');
  const [fromYear, setFromYear] = useState(
    CURRENT_YEAR - DEFAULT_YEAR_RANGE_LENGTH
  );
  const [toYear, setToYear] = useState(CURRENT_YEAR);

  // Event Handlers
  const handleSearchTermChange = e => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
  };
  const handleFromYearChange = e => {
    setFromYear(e.target.value);
  };

  const handleToYearChange = e => {
    setToYear(e.target.value);
  };
  return (
    <div>
      <Search
        searchTerm={searchTerm}
        handleSearchTermChange={handleSearchTermChange}
        MIN_YEAR={MIN_YEAR}
        MAX_YEAR={MAX_YEAR}
        fromYear={fromYear}
        toYear={toYear}
        handleFromYearChange={handleFromYearChange}
        handleToYearChange={handleToYearChange}
      />
    </div>
  );
}

export default App;
