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
  const [oceaniaCountries, setOceaniaCountries] = useState(false);
  const [page, setPage] = useState(1);
  const [showPerPage, setShowPerPage] = useState(5);

  // console.log('countries ===', countries);
  // console.log('countriesSmall ===', countriesSmall);
  console.log('page ===', page);

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

  function setPageCount(number: string) {
    console.log('number ===', number);
    setPage(+number);
  }

  function sortCountries() {
    setAscendingSort(!ascendingSort);
  }

  function filterCountries() {
    console.log('filterCountries');
    setOceaniaCountries(false);
    setCountriesSmall(!countriesSmall);
  }

  function filterOceania() {
    console.log('filterOceania');
    setCountriesSmall(false);
    setOceaniaCountries(!oceaniaCountries);
  }
  function pageUp() {
    if (page < countries.length / showPerPage) {
      setPage(page + 1);
    } else {
      return;
    }
  }
  function pageDown() {
    if (page > 1) {
      setPage(page - 1);
    } else {
      return;
    }
  }
  const countryCopy = [...countries];

  let countryArr;

  if (ascendingSort) {
    countryArr = countryCopy.sort((a: CountryType, b: CountryType) => a.name.localeCompare(b.name));
  } else {
    countryArr = countryCopy.sort((a: CountryType, b: CountryType) => b.name.localeCompare(a.name));
  }

  if (countriesSmall) {
    countryArr = countryCopy.filter((country: CountryType) => country.area < 65300);
    console.log('countryCopy ===', countryCopy);
  } else if (oceaniaCountries) {
    countryArr = countryCopy.filter((country: CountryType) => country.region === 'Oceania');
  }

  const finalCountryArr = countryArr.slice((page - 1) * showPerPage, page * showPerPage);

  return (
    <div className='bg-red-200 h-full'>
      <div className=' container '>
        <h1 className='py-2 text-2xl font-semibold'>Country list</h1>
        <div className='flex justify-between'>
          <div>
            <Button onClick={sortCountries}>Sort by name</Button>
            <Button onClick={filterCountries}>Smaller than Lithuania</Button>
            <Button onClick={filterOceania}>countries in Oceania</Button>
          </div>
          <Button onClick={() => console.log('Button clicked')}>Click me</Button>
        </div>
        <ul>
          {finalCountryArr.map((country: CountryType) => (
            <SingleCountry country={country} key={country.name} />
          ))}
        </ul>{' '}
        <div className='bg-gray-500'>
          <Button onClick={pageDown} children='page Down' />
          <Button onClick={pageUp} children='page Up' />
          <input
            type='number'
            value={page}
            onChange={(e) => {
              setPageCount(e.target.value);
            }}
          />
          <Button onClick={() => setShowPerPage(5)} children='5' />
          <Button onClick={() => setShowPerPage(8)} children='8' />
          <Button onClick={() => setShowPerPage(10)} children='10' />
        </div>
      </div>
    </div>
  );
}

export default App;
