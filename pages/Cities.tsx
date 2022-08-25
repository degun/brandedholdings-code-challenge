import type { NextPage } from 'next';
import Search from './Search';
import styles from '../styles/Cities.module.css';

const Cities: NextPage = () => {

  return (
    <div className={styles.cities}>
       <Search />
    </div>
  );
};

export default Cities;