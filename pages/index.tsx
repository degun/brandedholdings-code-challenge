import { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Search from './Search';
import Cities from './Cities';
import Weather from './Weather';
import { Location } from './types';
import styles from '../styles/Home.module.sass';

const Home: NextPage = () => {
  const [view, setView] = useState<'cities' | 'weather'>('weather');
  const [metric, setMetric] = useState<boolean>(true);
  const [dark, setDark] = useState<boolean>(false);
  const [cities, setCities] = useState<Location[]>([]);
  const [currentCity, setCurrentCity] = useState<Location>({});

 function changeMetric(){
  const lsMetric = metric ? '0' : '1';
  localStorage.setItem('metric',lsMetric);
  setMetric(!metric);
 }

 function changeDark(){
  const lsDark = dark ? '0' : '1';
  localStorage.setItem('dark', lsDark);
  setDark(!dark);
 }

  useEffect(() => {
    setDark(localStorage.getItem('dark') === '1' ? true : false);
    setMetric(localStorage.getItem('metric') === '1' ? true : false);
    const c = JSON.parse(localStorage.getItem('cities') ?? '');
    setCities(c);
  }, [])

  return (
    <div className={`${styles.container} ${dark ? styles.dark : ''}`}>
      <Head>
        <title>Create Next App</title>
        <meta name='description' content='Weather app' />
        <meta http-equiv="Content-Type" content="text/html;charset=UTF-8"></meta>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <header className={styles.header}>
        <Search setCurrentCity={setCurrentCity} setCities={setCities} dark={dark} />
        <div className={styles.switches}>
          <div className={styles.switch}>
            <input id="metric" type="checkbox" checked={!metric} onChange={changeMetric} />
            <label htmlFor='metric'>
              Imperial
            </label>
          </div>
          <div className={styles.switch}>
            <input id="dark" type="checkbox" checked={dark} onChange={changeDark} />
            <label htmlFor='dark'>
              Dark mode
            </label>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <Cities cities={cities} setCities={setCities} currentCity={currentCity} setCurrentCity={setCurrentCity} dark={dark} mobileShow={view === 'cities'} />
        <Weather metric={metric} setCities={setCities} currentCity={currentCity} setCurrentCity={setCurrentCity} mobileShow={view === 'weather'} />
      </main>
      <footer className={styles.footer}>
        <button className={`${styles.view} ${view === 'cities' ? styles.active : ''} `} onClick={() => setView('cities')} >Cities</button>
        <button className={`${styles.view} ${view === 'weather' ? styles.active : ''} `} onClick={() => setView('weather')}>Weather</button>
      </footer>
    </div>
  );
};

export default Home;
