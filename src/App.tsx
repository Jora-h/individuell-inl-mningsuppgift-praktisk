import React, { useState } from 'react';
import './App.css';
import { WordData } from './types';
import Search from './components/Search';
import List from './components/List';

const App = () => {
  const [searchResult, setSearchResult] = useState<WordData[] | null>(null);

  const handleSearch = (data: WordData[]) => {
    setSearchResult(data);
  }

  return (
    <div className="app">
      <h1>Dictionary Search</h1>
      <Search onSubmit={handleSearch}/>
      <List words={searchResult}/>
    </div>
  );
}

export default App;
