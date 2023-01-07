import { useEffect, useRef, useState } from 'react';
import countryApi from 'src/axios-client/countryApi';
import { Coords, Country, CountryDetailProps } from 'src/model';
import { CountryDetail } from '../CountryDetail';
import sortCase from '../hooks/sort';
import { Down, Up } from '../Icon';
import { Table } from './styles';

export interface ITableProps {
  records: Country[];
}

interface SortType {
  name: boolean;
  confirmed: boolean;
  death: boolean;
  recovered: boolean;
}

interface IconProps {
  isAscent: boolean;
}

const Icon = ({ isAscent }: IconProps) => {
  return <span>{isAscent ? <Down /> : <Up />}</span>;
};

export default function CustomTable(props: ITableProps) {
  const { records } = props;
  const [countryDetail, setCountryDetail] = useState<CountryDetailProps>({
    country: '',
    flagImage: '',
    population: 0,
    capital: '',
    region: '',
    subregion: '',
  });
  const [isOpenPopup, setIsOpenPopup] = useState<boolean>(false);
  const [sortedRecords, setSortedRecords] = useState<Country[]>(records);
  const [key, setKey] = useState<string>('');
  const [coords, setCoords] = useState<Coords>({
    x: 0,
    y: 0,
    height: 0,
  });

  // sort type false means using ASCENT SORT TYPE for both character and number
  const [sortType, setSortType] = useState<SortType>({
    name: false,
    confirmed: false,
    death: false,
    recovered: false,
  });
  const { name, confirmed, death, recovered } = sortType;

  const handleClickPopup = async (
    e: React.MouseEvent<HTMLTableRowElement>,
    param: string
  ) => {
    setIsOpenPopup(!isOpenPopup);
    await countryApi.get(`/${param}`).then((res: any) => {
      setCountryDetail({
        country: res[0].name.common,
        flagImage: res[0].flags.png,
        population: res[0].population.toLocaleString('en-US'),
        capital: Array.isArray(res[0].capital)
          ? res[0].capital[0]
          : res[0].capital,
        region: res[0].region,
        subregion: res[0].subregion,
      });
    });

    const node = e.target as HTMLElement;
    const clientRect = node.getBoundingClientRect() as DOMRect;

    setCoords({
      x: clientRect.left,
      y: clientRect.top + window.scrollY,
      height: clientRect.height,
    });
  };

  const handleSortName = () => {
    setKey('name');
    setSortType({ ...sortType, name: !sortType.name });
  };

  const handleSortConfirmed = () => {
    setKey('confirmed');
    setSortType({ ...sortType, confirmed: !sortType.confirmed });
  };

  const handleSortDeath = () => {
    setKey('death');
    setSortType({ ...sortType, death: !sortType.death });
  };

  const handleSortRecovered = () => {
    setKey('recovered');
    setSortType({ ...sortType, recovered: !sortType.recovered });
  };

  const nodeRef = useRef<Array<HTMLTableRowElement | null>>([]);

  useEffect(() => {
    const handleClickOutPopOver = (e: MouseEvent) => {
      const childNodeList = Array.from(
        nodeRef.current.map((el) => el?.childNodes)
      );
      if (
        nodeRef.current &&
        !childNodeList.map((el: any) => {
          return Array.from(el).every((td: any) => td === e.target);
        })
      ) {
        setIsOpenPopup(false);
      }
    };
    document.addEventListener('click', handleClickOutPopOver);

    return () => {
      document.removeEventListener('click', handleClickOutPopOver);
    };
  }, []);

  useEffect(() => {
    const result = sortCase({
      name,
      confirmed,
      death,
      recovered,
      records,
      key,
    });
    result ? setSortedRecords([...result]) : setSortedRecords(records);
  }, [name, confirmed, death, recovered, records, key]);

  return (
    <div>
      <Table>
        <tr>
          <th onClick={() => handleSortName()}>
            Name <Icon isAscent={name} />
          </th>
          <th onClick={() => handleSortConfirmed()}>
            Total Confirmed <Icon isAscent={confirmed} />
          </th>
          <th onClick={() => handleSortDeath()}>
            Total Deaths <Icon isAscent={death} />
          </th>
          <th onClick={() => handleSortRecovered()}>
            Total Recovered <Icon isAscent={recovered} />
          </th>
        </tr>
        {sortedRecords.map((e: any, i: number) => {
          const convertedCountry: Country = {
            id: e.ID,
            country: e.Country,
            totalConfirmed: e.TotalConfirmed,
            totalDeaths: e.TotalDeaths,
            totalRecovered: e.TotalRecovered,
          };

          return (
            <tr
              key={convertedCountry.id}
              onClick={(e) => handleClickPopup(e, convertedCountry.country)}
              ref={(el) => (nodeRef.current[i] = el)}
            >
              <td>{convertedCountry.country}</td>
              <td>{convertedCountry.totalConfirmed}</td>
              <td>{convertedCountry.totalDeaths}</td>
              <td>{convertedCountry.totalRecovered}</td>
            </tr>
          );
        })}
      </Table>
      <CountryDetail
        isOpen={isOpenPopup}
        countryDetail={countryDetail}
        coords={coords}
      />
    </div>
  );
}
