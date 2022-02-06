import './App.css';
import './App.css';
import { useState } from 'react';
import Search from './components/Search';

function App() {
  // States
  const [searchTerm, setSearchTerm] = useState('');

  // Event Handlers
  const handleSearchTermChange = e => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
  };

  return (
    <div>
      <Search
        searchTerm={searchTerm}
        handleSearchTermChange={handleSearchTermChange}
      />
    </div>
  );
}

export default App;
