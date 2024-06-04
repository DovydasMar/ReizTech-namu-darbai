type CountryType = {
  country: {
    name: string;
    region: string;
    area: number;
    independant: boolean;
  };
};

export default function SingleCountry({ country }: CountryType) {
  return (
    <li className='mt-2 mb-2 bg-green-200 p-3 rounded-md'>
      <div>Name: {country.name}</div>
      <div>Area: {country.area} km²</div>
      <div>Region: {country.region}</div>
      <div>{country.independant ? 'Independant' : 'Not independant'}</div>
    </li>
  );
}
