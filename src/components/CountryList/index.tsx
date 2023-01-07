import axiosClient from 'src/axios-client/covidApi';
import { useCallback, useEffect, useState } from 'react';
import { Country } from 'src/model';
import { Container } from './styles';
import CustomTable from './table';

export function CountryList() {
  const [record, setRecord] = useState<Country[]>([]);
  const [item, setItem] = useState<number>(25);
  const loadRecord = useCallback(() => {
    axiosClient.get<Country[]>('').then((res: any) => {
      setRecord(res.Countries.splice(0, item));
    });
  }, [item]);

  useEffect(() => {
    loadRecord();
  }, [loadRecord]);

  const handleScroll = (ev: any): void => {
    const windowHeight = window.innerHeight;
    const top = ev.target.documentElement.scrollTop;
    const contentHeight = ev.target.documentElement.scrollHeight;
    if (windowHeight + top >= contentHeight) {
      setItem((item) => item + 10);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll as any);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  console.log(record);

  return (
    <Container>
      <CustomTable records={record} />
    </Container>
  );
}
