import React, { useState, useRef } from "react";

const Weather = () => {
  //const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const cityRef = useRef();
  //since I dont need to re-render the component when input value changes I can use useRef instead of useState for the input value
  // The current value of the input field is captured in cityRef.current when the form is submitted

  //import.meta.env. for keeping api key secure.
  //It's a special object provided by Vite.
  //This object is available globally in your Vite application and
  //can be used to access any environment variables that are prefixed with VITE_

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (cityRef.current.value !== "") {
      //setCity(cityRef.current.value);
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${
            cityRef.current.value
          }&appid=${import.meta.env.VITE_APP_WEATHER_API_KEY}&units=metric`
        );
        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Please enter a city name.");
    }
  };

  console.log(weatherData);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <input
          ref={cityRef}
          type="text"
          placeholder="Enter city name"
          className="w-full px-3 py-2 border rounded-lg shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none"

          //value={city}
          //onChange={(event) => setCity(event.target.value)}
        />
        <button
          type="submit"
          className="mt-3 w-full px-3 py-2 border rounded-lg shadow-sm text-white bg-indigo-500 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Get Weather
        </button>
      </form>
      {weatherData && (
        <div className="mt-5">
          <h2 className="text-3xl font-bold text-gray-700">
            {weatherData.name}
          </h2>
          <p className="text-gray-600 text-lg capitalize">
            {weatherData.weather[0].description}
          </p>
          <p className="text-gray-600 text-lg">
            Temperature: {weatherData.main.temp} °C
          </p>
          <img
            className="mt-5 sm:w-32 sm:h-32 md:w-48 md:h-48 lg:w-64 lg:h-64 xl:w-96 xl:h-96"
            src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`}
            //https://openweathermap.org/img/wn/10d@2x.png
            alt="Weather Icon"
          />
        </div>
      )}
    </div>
  );
};

export default Weather;
