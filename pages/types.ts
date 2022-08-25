interface Condition {
  text: string
  icon: string
  code: number
}

interface Current {
  cloud: number
  condition: Condition
  feelslike_c: number
  feelslike_f: number
  gust_kph: number
  gust_mph: number
  humidity: number
  is_day: number
  last_updated: string
  last_updated_epoch: number
  precip_in: number
  precip_mm: number
  pressure_in: number
  pressure_mb: number
  temp_c: number
  temp_f: number
  uv: number
  vis_km: number
  vis_miles: number
  wind_degree: number
  wind_dir: string
  wind_kph: number
  wind_mph: number
}

interface Day {
  maxtemp_c: number
  maxtemp_f: number
  mintemp_c: number
  mintemp_f: number
  avgtemp_c: number
  avgtemp_f: number
  maxwind_mph: number
  maxwind_kph: number
  totalprecip_mm: number
  totalprecip_in: number
  avgvis_km: number
  avgvis_miles: number
  avghumidity: number
  daily_will_it_rain: number
  daily_chance_of_rain: number
  daily_will_it_snow: number
  daily_chance_of_snow: number
  condition: Condition
  uv: number
}

interface Astro {
  sunrise: string
  sunset: string
  moonrise: string
  moonset: string
  moon_phase: string
  moon_illumination: string
}

export interface Hour{
  time_epoch: number
  time: string
  temp_c: number
  temp_f: number
  is_day: number
  condition: Condition
  wind_mph: number
  wind_kph: number
  wind_degree: number
  wind_dir: string
  pressure_mb: number
  pressure_in: number
  precip_mm: number
  precip_in: number
  humidity: number
  cloud: number
  feelslike_c: number
  feelslike_f: number
  windchill_c: number
  windchill_f: number
  heatindex_c: number
  heatindex_f: number
  dewpoint_c: number
  dewpoint_f: number
  will_it_rain: number
  chance_of_rain: number
  will_it_snow: number
  chance_of_snow: number
  vis_km: number
  vis_miles: number
  gust_mph: number
  gust_kph: number
  uv: number
}

export interface HourData{
  time_epoch?: number
  time?: string
  is_day?: number
  condition?: Condition
  wind_degree?: number
  wind_dir?: string
  humidity?: number
  cloud?: number
  will_it_rain?: number
  chance_of_rain?: number
  will_it_snow?: number
  chance_of_snow?: number
  uv?: number
  temp?: number
  wind?: number
  pressure?: number
  precip?: number
  feelslike?: number
  windchill?: number
  heatindex?: number
  dewpoint?: number
  vis?: number
  gust?: number
}

interface ForecastDay {
  date: string
  date_epoch: number
  day: Day
  astro: Astro
  hour: Hour[]
}

export interface ForecastDayData {
  date: string
  date_epoch: number
  day: DayData
  astro?: Astro
  hour: HourData[]
}

export interface DayData {
  daily_will_it_rain: number
  daily_chance_of_rain: number
  daily_will_it_snow: number
  daily_chance_of_snow: number
  condition: Condition
  uv: number
  maxtemp: number
  mintemp: number
  avgtemp: number
  maxwind: number
  totalprecip: number
  avgvis: number
  avghumidity: number
}

export interface CurrentResponse {
  current: Current
  location: Location
  forecast: {
    forecastday: ForecastDay[]
  }
}

export interface CurrentData {
  cloud?: number
  condition?: Condition
  feelslike?: number
  gust?: number
  humidity?: number
  is_day?: number
  last_updated?: string
  last_updated_epoch?: number
  precip?: number
  pressure?: number
  temp?: number
  uv?: number
  vis?: number
  wind_degree?: number
  wind_dir?: string
  wind?: number
}

export interface Location {
  id?: number
  name?: string
  region?: string
  country?: string
  localtime?: string
  tz_id?: string
  lat?: number
  lon?: number
  url?: string
}