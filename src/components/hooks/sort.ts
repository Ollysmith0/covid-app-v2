import { Country } from 'src/model';

interface sortCaseProps {
  name: boolean;
  confirmed: boolean;
  death: boolean;
  recovered: boolean;
  records: Country[];
  key: string;
}

export default function sortCase({
  name,
  confirmed,
  death,
  recovered,
  records,
  key,
}: sortCaseProps) {
  let result;

  switch (key) {
    case 'name':
      if (name === true) {
        const sortedRecords = records.sort((a: any, b: any) =>
          b.Country.localeCompare(a.Country)
        );
        result = sortedRecords;
      } else if (name === false) {
        const sortedRecords = records.sort((a: any, b: any) =>
          a.Country.localeCompare(b.Country)
        );
        result = sortedRecords;
      }
      break;
    case 'confirmed':
      if (confirmed === true) {
        const sortedRecords = records.sort(
          (a: any, b: any) => b.TotalConfirmed - a.TotalConfirmed
        );
        result = sortedRecords;
      } else if (confirmed === false) {
        const sortedRecords = records.sort(
          (a: any, b: any) => a.TotalConfirmed - b.TotalConfirmed
        );
        result = sortedRecords;
      }
      break;
    case 'death':
      if (death === true) {
        const sortedRecords = records.sort(
          (a: any, b: any) => b.TotalDeaths - a.TotalDeaths
        );
        result = sortedRecords;
      } else if (death === false) {
        const sortedRecords = records.sort(
          (a: any, b: any) => a.TotalDeaths - b.TotalDeaths
        );

        result = sortedRecords;
      }
      break;
    case 'recovered':
      if (recovered === true) {
        const sortedRecords = records.sort(
          (a: any, b: any) => b.totalRecovered - a.totalRecovered
        );
        result = sortedRecords;
      } else if (recovered === false) {
        const sortedRecords = records.sort(
          (a: any, b: any) => a.totalRecovered - b.totalRecovered
        );
        result = sortedRecords;
      }
      break;
    default:
      break;
  }

  return result;
}
