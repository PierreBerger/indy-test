const baseUrl = 'https://api.openweathermap.org/data/2.5/weather'

type FetchWeatherByCityNameResponse = Promise<{ weather: string; temp: number }>

type OpenWeatherMapResponse = {
  main: {
    temp: number
  }
  weather: { main: string }[]
}

export const fetchWeatherByCityName = async (
  cityName: string,
): Promise<FetchWeatherByCityNameResponse> => {
  if (!process.env.OPENWEATHERMAP_APIKEY) {
    throw new Error('Missing openweathermap api_key')
  }

  const url = `${baseUrl}?q=${cityName}&appId=${process.env.OPENWEATHERMAP_APIKEY}&units=metric`

  const response = await fetch(url)
  const weather = (await response.json()) as OpenWeatherMapResponse

  return {
    weather: weather.weather[0].main.toLowerCase(),
    temp: weather.main.temp,
  }
}
