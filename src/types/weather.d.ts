interface IWeatherData {
  coord: ICoord;
  weather: IWeather[];
  base: string;
  main: IMain;
  visibility: number;
  wind: IWind;
  clouds: IClouds;
  dt: number;
  sys: ISys;
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

interface ISys {
  type: number;
  id: number;
  country: string;
  sunrise: number;
  sunset: number;
}

interface IClouds {
  all: number;
}

interface IWind {
  speed: number;
  deg: number;
}

interface IMain {
  temp: number;
  feelsLike: number;
  tempMin: number;
  tempMax: number;
  pressure: number;
  humidity: number;
}

interface IWeather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface ICoord {
  lon: number;
  lat: number;
}
