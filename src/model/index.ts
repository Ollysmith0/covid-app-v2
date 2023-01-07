export interface Country {
  id: number;
  country: string;
  totalConfirmed: number;
  totalDeaths: number;
  totalRecovered: number;
}

export interface CountryDetailProps {
  country: string;
  flagImage: string;
  population: number;
  capital: string;
  region: string;
  subregion: string;
}

export interface Coords {
  x: number;
  y: number;
  height: number;
}