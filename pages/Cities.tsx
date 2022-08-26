import type { NextPage } from 'next';
import { useState, Dispatch, SetStateAction, useEffect, MouseEvent } from 'react';
import { Location } from './types';
import styles from '../styles/Cities.module.sass';

interface Props {
  cities: Location[]
  setCities: Dispatch<SetStateAction<Location[]>>
  currentCity: Location
  setCurrentCity: Dispatch<SetStateAction<Location>>
  dark: boolean
  mobileShow: boolean
}

const Cities: NextPage<Props> = ({ cities, setCities, currentCity, setCurrentCity, dark, mobileShow }) => {
  const [page, setPage] = useState<number>(0);

  // reset the page number whenever the number of cities changes
  useEffect(() => {
    setPage(0);
  }, [cities])

  // if we select a city already in the list, switch to the page containing it
  useEffect(() => {
    const i = cities.findIndex(city => city.id === currentCity.id);
    setPage((i - (i % 5)) / 5);
  }, [currentCity])

  function removeCity(e: MouseEvent<HTMLElement>, id: number | undefined){
    e.stopPropagation();
    setCities(cities => {
      const newCities = cities.filter(city => city.id !== id);
      localStorage.setItem('cities', JSON.stringify(newCities));
      if(currentCity.id === id){
        setCurrentCity(newCities[0]);
      }
      return newCities;
    });
  }

  return (
    <div className={`${styles.cities} ${dark ? styles.dark : ''} ${mobileShow ? styles.mobileShow : ''}`}>
      <div className={styles['cities-list']}>
        <ul>
          {cities.slice(page * 5, (page + 1) * 5).map((city, i) => {
            const { id, name, region, country, lat, lon } = city;
            return (
              <li
                key={i}
                className={currentCity.id === id ? styles.selected : undefined}
                style={{ animationDelay: `${i * 30}ms` }}
                onClick={() => setCurrentCity(city)}
              >
                <div className={styles['name-region']}>
                  <div className={styles.name}>{name}</div>
                  <div className={styles.region}>{`${region ? `${region}, ` : ''}${country}`}</div>
                </div>
                <div className={styles.coordinates}>{`${lat}, ${lon}`}</div>
                <div className={styles.remove} onClick={e => removeCity(e, id)}>✕</div>
              </li>
            );
          })}
        </ul>
      </div>
      {cities.length > 5 && <div className={styles.pagination}>
        <button className={styles.previous} disabled={page === 0} onClick={() => setPage(page => page - 1)}>❮ Previous</button>
        <button className={styles.next} disabled={cities.length < (page + 1) * 5 + 1} onClick={() => setPage(page => page + 1)}>Next ❯</button>
      </div>}
    </div>
  );
};

export default Cities;
