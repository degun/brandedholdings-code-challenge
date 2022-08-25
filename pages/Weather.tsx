import type { NextPage } from 'next';
import { useEffect, useState, Dispatch, SetStateAction } from 'react';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faWind, faWater, faThermometer, faEye, faDroplet, faTemperature0, faTemperature4 } from '@fortawesome/free-solid-svg-icons';
import Search from './Search';
import styles from '../styles/Weather.module.sass';
import { Location, CurrentData, CurrentResponse, ForecastDayData, HourData } from './types';
config.autoAddCss = false;

interface Props {
  currentCity: Location
  setCities: Dispatch<SetStateAction<Location[]>>
  setCurrentCity: Dispatch<SetStateAction<Location>>
}

const Weather: NextPage<Props> = ({ currentCity, setCities, setCurrentCity }) => {
  const [selectedDay, setSelectedDay] = useState<number>(0);
  const [data, setData] = useState<CurrentResponse | undefined>();
  const [metric, setMetric] = useState<boolean>(true);
  const [isLoading, setLoading] = useState<boolean>(false);

  const q = currentCity.name ? `${currentCity.lat},${currentCity.lon}` : "auto:ip";

   // get weather forecast
   useEffect(() => {
    if (q) {
      setLoading(true);
      fetch(`https://api.weatherapi.com/v1/forecast.json?key=f27e122711544d58877135356222408&q=${q}&days=5&aqi=no&alerts=no`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setData(data);
          if(q === "auto:ip"){
            setCities([data.location])
          }
          setLoading(false);
        });
    }
  }, [q]);

  const currentData: CurrentData = {
    ...data?.current,
    feelslike: metric ? data?.current.feelslike_c : data?.current.feelslike_f,
    gust: metric ? data?.current.gust_kph : data?.current.gust_mph,
    precip: metric ? data?.current.precip_mm : data?.current.precip_in,
    pressure: metric ? data?.current.pressure_in : data?.current.pressure_mb,
    temp: metric ? data?.current.temp_c : data?.current.temp_f,
    wind: metric ? data?.current.wind_kph : data?.current.wind_mph,
    vis: metric ? data?.current.vis_km : data?.current.vis_miles,
  }

  const days: ForecastDayData[] = data?.forecast.forecastday.map(forecastday => ({
    ...forecastday,
    day: {
      ...forecastday.day,
      maxtemp: metric ? forecastday.day.maxtemp_c : forecastday.day.maxtemp_f,
      mintemp: metric ? forecastday.day.mintemp_c : forecastday.day.mintemp_f,
      avgtemp: metric ? forecastday.day.avgtemp_c : forecastday.day.avgtemp_f,
      maxwind: metric ? forecastday.day.maxwind_kph : forecastday.day.maxwind_mph,
      totalprecip: metric ? forecastday.day.totalprecip_mm : forecastday.day.totalprecip_in,
      avgvis: metric ? forecastday.day.avgvis_km : forecastday.day.avgvis_miles
    },
    hour: forecastday.hour.map(hour => ({
      ...hour,
      temp: metric ? hour.temp_c : hour.temp_f,
      wind: metric ? hour.wind_kph : hour.wind_mph,
      pressure: metric ? hour.pressure_mb : hour.pressure_in,
      precip: metric ? hour.precip_mm : hour.precip_in,
      feelslike: metric ? hour.feelslike_c : hour.feelslike_f,
      windchill: metric ? hour.windchill_c : hour.windchill_f,
      heatindex: metric ? hour.heatindex_c : hour.heatindex_f,
      dewpoint: metric ? hour.dewpoint_c : hour.dewpoint_f,
      vis: metric ? hour.vis_km : hour.vis_miles,
      gust: metric ? hour.gust_kph : hour.gust_mph,
    }))
  })) ?? [];

  const hours: HourData[] = days[selectedDay]?.hour ?? [];

  let classes = [];
  switch(true){
    case currentData.condition?.text.toLowerCase().includes('sunny'):
      classes.push(styles.sunny);
      break;
    case currentData.condition?.text.toLowerCase().includes('clear'):
      classes.push(styles.clear);
      break;
    case currentData.condition?.text.toLowerCase().includes('rain'):
      classes.push(styles.rainy);
      break;
    case currentData.condition?.text.toLowerCase().includes('snow'):
      classes.push(styles.snowy);
      break;
    case currentData.condition?.text.toLowerCase().includes('cloud'):
      classes.push(styles.cloudy);
      break;
  }

  return (
    <div className={`${styles.weather} ${classes.join(" ")}`}>
      <div className={styles.header}>
        <Search setCurrentCity={setCurrentCity} setCities={setCities} />
        <label>
          Imperial <input type="checkbox" checked={!metric} onChange={checked => setMetric(!metric)} />
        </label>
      </div>
      <div className={styles.current} >
        <div className={styles.left}>
          <div className={styles.head}>
            <div className={styles.city}>
              <FontAwesomeIcon icon={faLocationDot} size="sm" /> {data?.location.name}
            </div>
            <div className={styles.time}>
              Today, {data?.location.localtime?.split(" ")[1]}
            </div>
          </div>
          <div className={styles.main}>
            <div className={styles.feelslike}>
              Feels like {isLoading ? "--" : currentData.feelslike}&deg;{metric ? "C" : "F"}
            </div>
            <div className={styles.temp}>
              {isLoading ? "--" : currentData.temp}&deg;{metric ? "C" : "F"}
            </div>
            <div className={styles.condition}>
              {!isLoading && currentData.condition?.text}
            </div>
          </div>
          <div className={styles.foot}>
            <div className={styles.visibility}>
              <FontAwesomeIcon icon={faEye} size="sm" /> Visibility {isLoading ? "--" : currentData.vis} {metric ? "km" : "miles"}
            </div>
            <div className={styles.precipitation}>
              <FontAwesomeIcon icon={faWater} size="sm" /> Precipitation {isLoading ? "--" : currentData.precip} {metric ? "mm" : "in"}
            </div>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.data}>
            <div className={styles.image}>
              <img src={currentData.condition?.icon} alt={currentData.condition?.text} />
            </div>
            <div className={styles.statistics}>
              <div className={styles.row}>
                <div className={styles.left}>
                  <FontAwesomeIcon icon={faThermometer} size="sm" /> Pressure
                </div>
                <div className={styles.right}>{isLoading ? "--" : currentData.pressure} {metric ? "mb" : "in"}</div>
              </div>
              <div className={styles.row}>
                <div className={styles.left}>
                  <FontAwesomeIcon icon={faWind} size="sm" /> Wind
                </div>
                <div className={styles.right}>{isLoading ? "--" : currentData.wind} {metric ? "km/h" : "mi/h"}</div>
              </div>
              <div className={styles.row}>
                <div className={styles.left}>
                  <FontAwesomeIcon icon={faWind} size="sm" /> Gust
                </div>
                <div className={styles.right}>{isLoading ? "--" : currentData.gust} {metric ? "km/h" : "mi/h"}</div>
              </div>
              <div className={styles.row}>
                <div className={styles.left}>
                  <FontAwesomeIcon icon={faDroplet} size="sm" /> Humidity
                </div>
                <div className={styles.right}>{isLoading ? "--" : currentData.humidity} %</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ul className={styles.hourly}>
        {hours.map((hour, i) => {
          const currentTime = new Date((hour.time_epoch ?? 0) * 1000);
          return (
            <li key={hour.time_epoch} style={{ animationDelay: `${i * 15}ms` }}>
                <div className={styles.hour}>
                  {isLoading ? "--:--" : currentTime.toLocaleTimeString('en-US', { hour: "2-digit", minute: "2-digit" })}
                </div>
                <div className={styles.temperature}>
                  {isLoading ? "--" : hour.temp}&deg;{metric ? "C" : "F"}
                </div>
                <img src={hour.condition?.icon} alt={hour.condition?.text} />
            </li>
          )
        })}
      </ul>
      <ul className={styles.daily}>
        {days.map((forecastday, i) => {
          const { day, date_epoch } = forecastday;
          const currentDate = new Date(date_epoch * 1000);
          return (
            <li key={forecastday.date_epoch} className={selectedDay === i ? styles.selected : undefined} onClick={() => setSelectedDay(i)} style={{ animationDelay: `${i * 30}ms` }}>
              <div className={styles.city}>
                <div className={styles.weekday}>{i === 0 ? "Today" : currentDate.toLocaleDateString('en-US', { weekday: 'long' })}</div>
                <div className={styles['short-date']}>{currentDate.toLocaleDateString('en-US', { day: '2-digit', month: 'short'})}</div>
              </div>
              <div className={styles.right}>
                <div className={styles.row}>
                    <FontAwesomeIcon icon={faThermometer} size="sm" /> {isLoading ? "--" : currentData.pressure} {metric ? "mb" : "in"}
                </div>
                <div className={styles.row}>
                  <FontAwesomeIcon icon={faWind} size="sm" /> {isLoading ? "--" : currentData.wind} {metric ? "km/h" : "mi/h"}
                </div>
                <div className={styles.col}>
                  <div className={styles.row}>
                    <FontAwesomeIcon icon={faTemperature0} size="sm" /> {isLoading ? "--" : day.mintemp}&deg;{metric ? "C" : "F"}
                  </div>
                  <div className={styles.row}>
                    <FontAwesomeIcon icon={faTemperature4} size="sm" /> {isLoading ? "--" : day.maxtemp}&deg;{metric ? "C" : "F"}
                  </div>
                </div>
                <div className={styles.temperature}>
                  {isLoading ? "--" : day.avgtemp}&deg;{metric ? "C" : "F"}
                </div>
                <img src={day.condition.icon} alt={day.condition.text} />
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  );
};

export default Weather;
