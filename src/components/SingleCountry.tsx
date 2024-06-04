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
    <li className='border-y border-black mt-2 bg-slate-100'>
      <div>{country.name}</div>
      <div>{country.area} km²</div>
      <div>{country.region}</div>
      <div>{country.independant ? 'Independant' : 'Not independant'}</div>
    </li>
  );
}
