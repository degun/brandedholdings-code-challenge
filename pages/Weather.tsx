import type { NextPage } from 'next';
import { City } from './index';
import styles from '../styles/Weather.module.css';

interface Props {
  currentCity: City;
}

const Weather: NextPage<Props> = ({ currentCity }) => {

  return (
    <div className={styles.weather}>
      
    </div>
  );
};

export default Weather;
