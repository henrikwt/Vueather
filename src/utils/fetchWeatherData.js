const fetchWeatherData = async (latitude, longitude, timezone) => {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,apparent_temperature,rain,cloud_cover&hourly=temperature_2m&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max&timezone=${timezone}`
    )
    return await response.json()
}

export default fetchWeatherData;