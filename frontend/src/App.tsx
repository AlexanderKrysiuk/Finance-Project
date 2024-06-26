import { ChangeEvent, SyntheticEvent, useState } from 'react';
import './App.css';
import CardList from './Components/CardList/CardList';
import Search from './Components/Search/Search';
import { CompanySearch } from './company';
import { searchCompanies } from './api';
import ListPortfolio from './Components/Portfolio/ListPortfolio/ListPortfolio';
import Hero from './Components/Hero/Hero';
import Navbar from './Components/Navbar/Navbar';

function App() {
  const [search, setSearch] = useState<string>("");
  const [searchResult, setSearchResult] = useState<CompanySearch[]>([]);
  const [portoflioValues, setPortfolioValues] = useState<string[]>([]);
  const [serverError, setServerError] = useState<string | null>(null);
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    console.log(e);
  };

  const onPortfolioCreate = (e: any) => {
    e.preventDefault();
    const exists = portoflioValues.find((value) => value === e.target[0].value);
    if (exists) return;
    const updatedPortfolio = [...portoflioValues, e.target[0].value]
    setPortfolioValues(updatedPortfolio);
  };

  const onPortfolioDelete = (e: any) => {
    e.preventDefault();
    const removed = portoflioValues.filter((value) => {
      return value !== e.target[0].value;
    });
    setPortfolioValues(removed);
  }

    const onSearchSubmit = async (e: SyntheticEvent) => {
      e.preventDefault();
      const result = await searchCompanies(search);
      if(typeof result === "string") {
        setServerError(result);
      } else if (Array.isArray(result.data)) {
        setSearchResult(result.data);
      }
      console.log(searchResult);
    };
  return (
    <div className='App'>
      <Navbar/>
      <Search onSearchSubmit={onSearchSubmit} search={search} handleSearchChange={handleSearchChange}/>
      <ListPortfolio 
        portfolioValues={portoflioValues} 
        onPortfolioDelete={onPortfolioDelete}
      />
      <CardList searchResults={searchResult} onPortfolioCreate={onPortfolioCreate}/>
      {serverError && <div>Unable to connect to API</div>}
    </div>
  );
}

export default App;
