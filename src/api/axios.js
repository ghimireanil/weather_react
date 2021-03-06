import axios from 'axios';

const baseURL = 'http://api.openweathermap.org/data/2.5/weather?';
const apikey = '5d12cb5130f5a39b7d14f66389d2cf6a';

export const getWeatherData = async (cityname) => {
  try {
    const { data } = await axios.get(baseURL + `q=${cityname}&APPID=${apikey}`);

    return data;
  } catch (err) {
    throw err;
  }
};
