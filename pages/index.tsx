import { useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Cities from './Cities';
import Weather from './Weather';
import { Location } from './types';
import styles from '../styles/Home.module.sass';

const Home: NextPage = () => {
  const [cities, setCities] = useState<Location[]>([]);
  const [currentCity, setCurrentCity] = useState<Location>({});

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name='description' content='Weather app' />
        <meta http-equiv="Content-Type" content="text/html;charset=UTF-8"></meta>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <Cities cities={cities} setCities={setCities} currentCity={currentCity} setCurrentCity={setCurrentCity} />
        <Weather setCities={setCities} currentCity={currentCity} setCurrentCity={setCurrentCity} />
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
};

export default Home;
