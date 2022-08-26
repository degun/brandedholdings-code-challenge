import {
  useState,
  useEffect,
  ChangeEvent,
  MouseEvent,
  KeyboardEvent,
  Dispatch,
  SetStateAction,
} from 'react';
import type { NextPage } from 'next';
import { useDebounce } from '../utils/hooks';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faSpinner } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/Search.module.sass';
import { Location } from './types';
config.autoAddCss = false;

interface Props {
  setCurrentCity: Dispatch<SetStateAction<Location>>
  setCities: Dispatch<SetStateAction<Location[]>>
  dark: boolean
}

const Search: NextPage<Props> = ({ setCurrentCity, setCities, dark }) => {
  const [value, setValue] = useState<string>('');
  const [results, setResults] = useState<Location[]>([]);
  const [visible, setVisible] = useState<Boolean>(false);
  const [active, setActive] = useState<Boolean>(false);
  const [selected, setSelected] = useState<number>(0);
  const [isLoading, setLoading] = useState<Boolean>(false);

  const q = useDebounce<string>(value, 300);

  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setValue(target.value);
  };

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key == 'ArrowDown') {
      setSelected(selected === results?.length - 1 ? 0 : selected + 1);
    }
    if (e.key == 'ArrowUp') {
      setSelected(selected === 0 ? results?.length - 1 : selected - 1);
    }
    if (e.key == 'Escape') {
      setVisible(false);
    }
    if (e.key == 'Enter') {
      if (visible) {
        select();
      } else {
        setVisible(true);
      }
    }
  }

  function select(e?: MouseEvent<HTMLLIElement>) {
    e?.preventDefault();
    const city = results[selected];
    setValue('');
    setVisible(false);
    setCurrentCity(city);
    setCities((cities) => {
      const ids = cities.map(({ id }) => id);
      if (ids.includes(city.id)) {
        return cities;
      } else {
        localStorage.setItem('cities', JSON.stringify([city, ...cities]));
        return [city, ...cities];
      }
    });
  }

  useEffect(() => {
    if (q.length > 2) {
      setLoading(true);
      fetch(
        `https://api.weatherapi.com/v1/search.json?key=f27e122711544d58877135356222408&q=${q}`
      )
        .then((res) => res.json())
        .then((data) => {
          setSelected(0);
          setResults(data);
          setVisible(true);
          setLoading(false);
        });
    } else {
      setSelected(0);
      setResults([]);
    }
  }, [q]);

  return (
    <div className={`${styles.search} ${active ? styles.active : ''} ${dark ? styles.dark : ''} `} onKeyDown={handleKeyDown}>
      <div className={styles.bar}>
        <FontAwesomeIcon icon={faSearch} size='lg' />
        <input
          value={value}
          onChange={handleChange}
          placeholder='Search city'
          onFocus={() => {
            setActive(true);
            setVisible(true);
          }}
          onBlur={() => {
            // set a timeout so that the li.onclick event gets triggered. 300ms of timeout does no harm
            setActive(false);
            setTimeout(() => {
              setVisible(false);
            }, 100);
          }}
        />
        {isLoading && <FontAwesomeIcon icon={faSpinner} size='lg' />}
      </div>
      {
        <ul>
          {visible &&
            results.map(({ name, url, region, country, lat, lon }, i) => (
              <li
                key={url}
                className={selected === i ? styles.selected : undefined}
                style={{ animationDelay: `${i * 15}ms` }}
                onMouseOver={() => setSelected(i)}
                onClick={select}
              >
                <div className={styles['name-region']}>
                  <div className={styles.name}>{name}</div>
                  <div className={styles.region}>{`${
                    region ? `${region}, ` : ''
                  }${country}`}</div>
                </div>
                <div className={styles.coordinates}>{`${lat}, ${lon}`}</div>
              </li>
            ))}
        </ul>
      }
    </div>
  );
};

export default Search;
