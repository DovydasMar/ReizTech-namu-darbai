import './App.css';
import axios from 'axios';
import Button from './components/Button';
import { useEffect, useState } from 'react';
import SingleCountry from './components/SingleCountry';

type CountryType = {
  name: string;
  region: string;
  area: number;
  independant: boolean;
};
function App() {
  const [countries, setCountries] = useState([]);
  const [ascendingSort, setAscendingSort] = useState(true);
  const [countriesSmall, setCountriesSmall] = useState(false);

  // console.log('countries ===', countries);
  console.log('countriesSmall ===', countriesSmall);

  useEffect(() => {
    getCountryList();
  }, []);
  function getCountryList() {
    axios
      .get('https://restcountries.com/v2/all?fields=name,region,area', { timeout: 15000 })
      .then((response) => {
        setCountries(response.data);
      })
      .catch((error) => console.log(error));
  }

  function sortCountries() {
    setAscendingSort(!ascendingSort);
  }

  function filterCountries() {
    console.log('filterCountries');

    setCountriesSmall(!countriesSmall);
  }
  const countryCopy = [...countries];

  if (ascendingSort) {
    countryCopy.sort((a: CountryType, b: CountryType) => a.name.localeCompare(b.name));
  } else {
    countryCopy.sort((a: CountryType, b: CountryType) => b.name.localeCompare(a.name));
  }

  if (countriesSmall) {
    countryCopy.filter((country: CountryType) => country.area < 65300);
    console.log('countryCopy ===', countryCopy);
  } else {
    countryCopy.filter((country: CountryType) => country.area > 1);
    console.log('countryCopy ===', countryCopy);
  }

  return (
    <div className='bg-red-200'>
      <div className=' container'>
        <h1>Country list</h1>
        <div className='flex justify-between'>
          <div>
            <Button onClick={sortCountries}>Sort by name</Button>
            <Button onClick={filterCountries}>Smaller than Lithuania</Button>
          </div>
          <Button onClick={() => console.log('Button clicked')}>Click me</Button>
        </div>
        <ul>
          {countryCopy.map((country: CountryType) => (
            <SingleCountry country={country} key={country.name} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
