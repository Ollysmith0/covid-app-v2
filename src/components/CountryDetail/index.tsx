import { createPortal } from 'react-dom';
import { Coords, CountryDetailProps } from 'src/model';
import { Card, Container } from './styles';

interface ICountryDetailProps {
  isOpen: boolean;
  countryDetail: CountryDetailProps;
  coords: Coords;
  position?: 'right' | 'left';
}

export function CountryDetail({
  isOpen,
  countryDetail,
  coords,
  position = 'left',
}: ICountryDetailProps): JSX.Element {
  const { country, flagImage, population, capital, region, subregion } =
    countryDetail;
  const { x, y, height } = coords;

  const Modal = () => {
    return createPortal(
      <>
        {isOpen && (
          <Card
            style={{ [position]: x + 3.5, top: y + height + 1.5 }}
          >
            <img
              style={{ width: '15rem', height: '10em' }}
              src={`${flagImage}`}
              alt="country-flag"
            />
            <Container>
              <div>Name: {country}</div>
              <div>Population: {population}</div>
              <div>Capital: {capital}</div>
              <div>Region: {region}</div>
              <div>Subregion: {subregion}</div>
            </Container>
          </Card>
        )}
      </>,
      document.getElementById('root') as HTMLElement
    );
  };

  return <Modal />;
}
