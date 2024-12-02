import './index.css';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';


import hight from "../src/assets/high.png"
import lowt from "../src/assets/low.png"
import humidityPic from "../src/assets/humidity.png"
import windy from "../src/assets/wind.png"


import search from "./assets/search-unscreen.gif"
import menuon from "../src/assets/menu.png"
import message from "./assets/message.gif"
import silent from "./assets/silence.png"

import clear from "./assets/weather/clear.gif"
import clouds from "../src/assets/weather/clouds2.gif"
import mist from "./assets/weather/mist2.gif"
import rain from "./assets/weather/rain1.gif"
import snow from "./assets/weather/snow2.gif"
import sun from "../src/assets/weather/sun.gif"
import thunder from "../src/assets/weather/thunder.gif"
import wind from "./assets/weather/wind1.gif"





import good from "./assets/good.gif"
import fair from "../src/assets/fair.gif"
import moderate from "../src/assets/moderate.gif"
import poor from "../src/assets/poor.gif"
import veryPoor from "./assets/Very poor.gif"


import goode from "./assets/good1.gif"
import faire from "./assets/fair1.gif"
import moderatee from "./assets/moderate1.gif"
import poore from "./assets/poor1.gif"
import verypoore from "./assets/verypoor1.gif"



function App() {

  const [city, setCity] = useState("")
  const [cityName,setCityName]= useState("")
  const [weather, setweather] = useState("")
  const [weatherDesc, setDesc] = useState("")
  const [weatherImage,setWeatherImage]= useState("")
  const [temperature, setTemp] = useState("")
  const [highTemp, setHigh] = useState("")
  const [lowTemp, setLow] = useState("")
  const [humidity, SetHum] = useState("")
  const [windspeed, setSpeed] = useState("")
  const [visibility,setVisibility] = useState("")
  const [airLevel, setAirLevel] = useState(null)
  const [airImage, setAirImage] = useState("")
  
  
  const [currentTime, setCurrentTime] = useState("")
  const [currenDate, setCurrentDate] = useState("")


  const airIndicator = [good, fair, moderate, poor, veryPoor]
  const airQualityIndicator = airIndicator[airLevel - 1]
  const airEmoji = [goode,faire,moderatee,poore,verypoore]

  const weatherImages = {Clear:clear,  Clouds: clouds,  Mist: mist,  Haze: mist,  Fog: mist, Rain: rain,
    Drizzle:rain, Snow: snow, Sunny: sun, Thunderstorm: thunder,Wind: wind}

  useEffect(() => {
    if (weather && weatherImages[weather]) {
      setWeatherImage(weatherImages[weather]);
    }
  }, [weather])



  useEffect(() => {
    if (airLevel) {
      setAirImage(airEmoji[airLevel - 1]);
    }
  }, [airLevel]);


  function citySelect(event) {
    setCity(event.target.value)
  }

  function getCurrentTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  }

  
  // Function to update the current time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(getCurrentTime());
    }, 1000);

    // Cleanup the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  
  

  // Function to get the current date
  function getCurrentDate() {
    const now = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return now.toLocaleDateString(undefined, options); // e.g., "October 5, 2023"
  }

  // Function to update the current time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(getCurrentTime());
    }, 1000);

    // Set the initial date
    setCurrentDate(getCurrentDate());

    // Cleanup the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  function getWeather() {
    axios(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=b0c59e311c9144243c6384e15e7696c6&units=metric`)
      .then(function (success) {
        
        setTemp(success.data.main.temp);


        setweather(success.data.weather[0].main);
        setCityName(success.data.name)
        console.log(success.data)
       setDesc(success.data.weather[0].description)
        setHigh(success.data.main.temp_max);
        setLow(success.data.main.temp_min);
        SetHum(success.data.main.humidity);
        setSpeed(success.data.wind.speed);
        setVisibility(success.data.visibility)
        console.log(success.data.visibility)
       
        
  
        // Define latitude and longitude here
        const latitude = success.data.coord.lat;
        const longitude = success.data.coord.lon;
  
        
        return axios(`http://api.openweathermap.org/data/2.5/air_pollution?lat=${latitude}&lon=${longitude}&appid=b0c59e311c9144243c6384e15e7696c6`);
      })
      .then(function (airSuccess) {
        setAirLevel(airSuccess.data.list[0].main.aqi);
       
        
      })
      
  }








  return (
    <div id="container">


      {/* Header section */}
      <div className='   '>
        <div className=' text-white text-2xl '>
          <h1 className='text-5xl px-5 py-2'>WeatherWhiz</h1>


        </div>

        <div className=' items-center  text-center'>

          <div className='  flex justify-center  items-center text-center'>
            <input value={city} onChange={citySelect} className='py-2  px-32 rounded-3xl outline-none text-center' type="text" placeholder='Search Location ' />
            <button> <img onClick={getWeather} className='h-16  cursor-pointer' src={search} alt="" /></button>
          </div>

          <p className='text-lg text-gray-200 font-medium'>Forecasting Your Day, Every Day.</p>

        </div>
      </div>


      {/* Weather Section */}


      <div className="flex justify-center gap-5 items-start h-screen  mt-10 " >


        {/* Container 1 */}

        <div className=" w-2/5 md:w-1/5   bg-black  opacity-90 text-white rounded-3xl text-center ">

          <div className=' flex justify-between px-6 py-5'>
            <img className='h-8' src={menuon} alt="" />
            <h2 className=' text-xl'>{currentTime}</h2>

          </div>


          <div className='flex flex-col items-center'>
            <h1 className='text-2xl'>{cityName}</h1>
            <p className=' '>Today,{currenDate}</p>
            {weatherImage && <img className=' h-32 rounded-xl' src={weatherImage} alt={weather} />}
            <h1 className='text-5xl'>{temperature} °C</h1>
            <h1 className='text-2xl'>{weather}</h1>
          </div>




          <div className=' justify-around  m-5 gradient-background  rounded-lg'>

            <div className='flex  items-center  justify-between text-white  text-md  p-2'>
              <div className='' >
                <h2>Temp Max</h2>
              </div>
              <div className='flex gap-3'>
                <p>{highTemp} °C</p>

                <img className='h-5' src={hight} alt="" />
              </div>
            </div>

            <div className='flex  items-center justify-between text-white  text-md p-2 '>
              <div >
                <h2>Temp Min</h2>
              </div>
              <div className='flex gap-3'>
                <p>{lowTemp} °C</p>

                <img className='h-5' src={lowt} alt="" />
              </div>
            </div>

            <div className='flex  items-center text-white justify-between text-md p-2'>
              <div >
                <h2>Humidity</h2>
              </div>
              <div className='flex gap-3'>
                <p>{humidity}</p>

                <img className='h-5' src={humidityPic} alt="" />
              </div>
            </div>

            <div className='flex  items-center justify-between text-white  text-md p-2'>
              <div >
                <h2>Wind</h2>
              </div>
              <div className='flex gap-3'>
                <p>{windspeed} Km/hr</p>

                <img className='h-5' src={windy} alt="" />
              </div>
            </div>

          </div>


        </div>


        {/* container 2 */}

        <div className=" w-2/5 md:w-1/5   bg-black  opacity-90 text-white rounded-3xl text-center ">



          <div className='flex justify-between items-center px-6 py-1'>

            <div>
              <img className='h-20' src={message} alt="" />
            </div>
            <div>
              <img className='h-6 ' src={silent} alt="" />
            </div>

          </div>


          <div className='flex flex-col items-center '>


            <div className='text-center p-5 gradient-background  rounded-lg '>
            <div className='flex justify-between m-1 items-center gap-5'>
            <h1 className='text-md'>Description</h1>
            <p className='text-md'>{weatherDesc}</p>
            </div>

            <div className='flex justify-between items-center m-1 gap-5'>
            <h1 className='text-md'>Visibility</h1>
            <p className='text-md'>{visibility}</p>
            </div>
            </div>
            <h1 className='text-5xl mt-4'>Air Quality</h1>
            <img className='h-28' src={airQualityIndicator} alt="" />
            <img className='h-36' src={airImage} alt="" />
            

            

          </div>







        </div>





        





      </div>



    </div>
  )
}

export default App;
