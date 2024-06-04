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
  const [isLoading, setIsLoading] = useState(false);
  const [errOnFetch, setErrOnFetch] = useState(false);

  useEffect(() => {
    getCountryList();
  }, []);
  function getCountryList() {
    setIsLoading(true);
    setErrOnFetch(false);
    axios
      .get('https://restcountries.com/v2/all?fields=name,region,area', { timeout: 15000 })
      .then((response) => {
        setCountries(response.data);
        setErrOnFetch(false);
      })
      .catch((error) => {
        console.warn(error);
        setErrOnFetch(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function setPageCount(number: string) {
    // number comes in as a string from input, so i converted it to a number
    setPage(+number);
  }

  function sortCountries() {
    setAscendingSort(!ascendingSort);
  }

  function filterCountries() {
    // filtering smaller countries than Lithuania
    setOceaniaCountries(false);
    setCountriesSmall(!countriesSmall);
  }

  function filterOceania() {
    // filtering countries in Oceania
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

  // creating a shallow copy of the countries array to avoid changing the original array
  const countryCopy = [...countries];

  // creating a new array of countries to be changed based on the filters
  let countryArr;

  if (ascendingSort) {
    countryArr = countryCopy.sort((a: CountryType, b: CountryType) => a.name.localeCompare(b.name));
  } else {
    countryArr = countryCopy.sort((a: CountryType, b: CountryType) => b.name.localeCompare(a.name));
  }

  if (countriesSmall) {
    countryArr = countryCopy.filter((country: CountryType) => country.area < 65300);
  } else if (oceaniaCountries) {
    countryArr = countryCopy.filter((country: CountryType) => country.region === 'Oceania');
  }

  // creating another array for pagination
  const finalCountryArr = countryArr.slice((page - 1) * showPerPage, page * showPerPage);

  return (
    <div className='vh-100'>
      <div className=' container '>
        <h1 className='py-2 text-2xl font-semibold'>Country list</h1>
        <div className='flex justify-between'>
          <div className=''>
            <Button onClick={sortCountries}>
              {/* making z-a and a-z sort dynamic changing */}
              {ascendingSort ? 'Sort by name Z-A' : 'Sort by name A-Z'}
            </Button>
          </div>
          <div className='flex gap-2'>
            <Button onClick={filterCountries}>
              {/* making dynamic changing of the text */}
              {countriesSmall ? 'All countries' : 'Smaller than Lithuania'}
            </Button>
            <Button onClick={filterOceania}>
              {/* making dynamic changing of the text */}
              {oceaniaCountries ? 'All countries' : 'Countries in Oceania'}
            </Button>
          </div>
        </div>
        <ul>
          {/* lazy loading */}
          {isLoading && <p>Loading...</p>}
          {/* if API doesn't work it will show this message just need to restart page, until it starts working again */}
          {errOnFetch && <p>Something went wrong, please restart this page</p>}
          {finalCountryArr.map((country: CountryType) => (
            <SingleCountry country={country} key={country.name} />
          ))}
        </ul>{' '}
        <div className='bg-gray-300 flex justify-between p-2'>
          <div className='flex gap-2'>
            <Button onClick={pageUp} children='page Up' />
            <div className='flex gap-2'>
              <input
                className='w-14 px-1 mt-1 h-8 border-2 border-black'
                type='number'
                min={1}
                step={1}
                value={page}
                onChange={(e) => {
                  setPageCount(e.target.value);
                }}
              />
              <p className='w-full px-1 mt-2'>/ {Math.ceil(countryArr.length / showPerPage)}</p>
            </div>
            <Button onClick={pageDown} children='page Down' />
          </div>
          <div className='flex justify-between gap-2'>
            <p className='mt-2'>Show per page:</p>
            <Button onClick={() => setShowPerPage(1)} children='1' />
            <Button onClick={() => setShowPerPage(5)} children='5' />
            <Button onClick={() => setShowPerPage(10)} children='10' />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
