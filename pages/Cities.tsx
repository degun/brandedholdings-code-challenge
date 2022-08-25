import type { NextPage } from 'next';
import { useState, Dispatch, SetStateAction } from 'react';
import Search from './Search';
import { City } from './index';
import styles from '../styles/Cities.module.css';

interface Props {
  currentCity: City;
  setCurrentCity: Dispatch<SetStateAction<City>>;
}

const Cities: NextPage<Props> = ({ currentCity, setCurrentCity }) => {
  const [cities, setCities] = useState<City[]>([]);

  return (
    <div className={styles.cities}>
      <Search setCurrentCity={setCurrentCity} setCities={setCities} />
      <div className={styles['cities-list']}>
        <ul>
          {cities.map((city) => {
            const { id, name, url, region, country, lat, lon } = city;
            return (
              <li
                key={url}
                className={currentCity.id === id ? styles.selected : undefined}
                onClick={() => setCurrentCity(city)}
              >
                <div className={styles['name-region']}>
                  <div className={styles.name}>{name}</div>
                  <div className={styles.region}>{`${region}, ${country}`}</div>
                </div>
                <div className={styles.coordinates}>{`${lat}, ${lon}`}</div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Cities;
