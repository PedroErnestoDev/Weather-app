import { Fragment, useEffect, useState } from 'react'
import './App.css'
import axios from 'axios';

function App() {
  const [location, setLocation] = useState(false);
  const [weather, setWeather] = useState(false);

  let getWeather = async (lat, long) => {
    let res = await axios.get("http://api.openweathermap.org/data/2.5/weather", {
      params: {
        lat: lat,
        lon: long,
        appid: import.meta.env.VITE_OPEN_WEATHER_KEY,
        lang: 'pt',
        units: 'metric'
      }
    });
    setWeather(res.data);
    console.log(res.data)
  }

  useEffect(() =>{
    navigator.geolocation.getCurrentPosition((position)=> {
      getWeather(position.coords.latitude, position.coords.longitude);
      setLocation(true)
    })
  }, [])

  if (location == false){
    return(
      <Fragment>Do you need enable the location in the browser</Fragment>
    )
  } else{
  return (
    <Fragment>
  {weather && weather.main ? (
    <>
  <h1>Clima Atual em {weather.name}</h1>
      <p>Temperatura Atual: {weather.main.temp}°C</p>
      <p>Temperatura Máxima: {weather.main.temp_max}°C</p>
      <p>Temperatura Mínima: {weather.main.temp_min}°C</p>
      <p>Pressão: {weather.main.pressure} hPa</p>
      <p>Umidade: {weather.main.humidity} %</p>
      <h3>Sua coordenada {weather.coord.lon} {weather.coord.lat}</h3>
    </>
  ) : (
    <p>Carregando dados do clima...</p>
  )}
</Fragment>
  )
}}

export default App
