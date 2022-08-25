import { useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Cities from './Cities';
import Weather from './Weather';
import styles from '../styles/Home.module.css';

export interface City {
    id?: number;
    name?: string;
    region?: string;
    country?: string;
    lat?: number;
    lon?: number;
    url?: string;
  }

const Home: NextPage = () => {
  const [currentCity, setCurrentCity] = useState<City>({});

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <Cities currentCity={currentCity} setCurrentCity={setCurrentCity} />
        <Weather currentCity={currentCity} />
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
};

export default Home;
