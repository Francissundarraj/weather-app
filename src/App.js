import './index.css';
import hight from "../src/assets/high.png"
import lowt from "../src/assets/low.png"
import humidity from "../src/assets/humidity.png"
import menuon from "../src/assets/menu.png"
import settings from "../src/assets/settings.png"
import lefta from "../src/assets/left-arrow.png"

import search from "./assets/search-unscreen.gif"
import message from "./assets/message1.gif"
import silent from "./assets/silence.png"


import thunder from "../src/assets/weather/thunder1.gif"
import windy from "../src/assets/wind.png"
import sunny from "../src/assets/weather/sun1.gif"
import clouds from "../src/assets/weather/clouds.gif"

import good from "./assets/good.gif"
import fair from "../src/assets/fair.gif"
import moderate from "../src/assets/moderate.gif"
import poor from "../src/assets/poor.gif"
import veryPoor from "./assets/Very poor.gif"
import axios from 'axios';
import { useState } from 'react';

function App() {

  const [city, setCity] = useState("")

  const [weather, setweather] = useState("")
  const [temperature, setTemp] = useState("")
  const [highTemp, setHigh] = useState("")
  const [lowTemp, setLow] = useState("")
  const [humiditi, SetHum] = useState("")
  const [windspeed, setSpeed] = useState("")
  const [airLevel, setAirLevel] = useState("")
  const [forecast, setForecast] = useState("")

  const airIndicator = [good, fair, moderate, poor, veryPoor]



  const airQualityIndicator = airIndicator[airLevel - 1]


  function citySelect(event) {
    setCity(event.target.value)
  }


  function getWeather() {
    axios(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=b0c59e311c9144243c6384e15e7696c6`)

      .then(function (success) {
        setweather(success.data.weather[0].main)
        setTemp(success.data.main.temp)
        setHigh(success.data.main.temp_max)
        setLow(success.data.main.temp_min)
        SetHum(success.data.main.humidity)
        setSpeed(success.data.wind.speed)

        const latitude = success.data.coord.lat
        const longitude = success.data.coord.lon

        return axios(`http://api.openweathermap.org/data/2.5/air_pollution?lat=${latitude}&lon=${longitude}&appid=b0c59e311c9144243c6384e15e7696c6`)

      })

      .then(function (airSuccess) {
        setAirLevel(airSuccess.data.list[0].main.aqi);

        return axios(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=b0c59e311c9144243c6384e15e7696c6`)

      })

     
      

  
      .then(function(foreSuccess) {
        setForecast(foreSuccess.data)
        console.log(foreSuccess.data)
  
    })

    .catch(function (error) {
      console.error("Error fetching data:", error);
    });

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
            <h2 className=' text-xl'>10:24:30 PM</h2>

          </div>


          <div className='flex flex-col items-center'>
            <h1 className='text-2xl'>{city}</h1>
            <p className=' '>Today,26 Jul</p>
            <img className='h-36' src={sunny} alt="" />
            <h1 className='text-5xl'>{temperature}</h1>
            <h1 className='text-2xl'>{weather}</h1>
          </div>




          <div className=' justify-around  m-5 bg-slate-800  rounded-lg'>

            <div className='flex  items-center  justify-between text-white  text-md  p-2'>
              <div className='' >
                <h2>Temp Max</h2>
              </div>
              <div className='flex gap-3'>
                <p>{highTemp}</p>

                <img className='h-5' src={hight} alt="" />
              </div>
            </div>





            <div className='flex  items-center justify-between text-white  text-md p-2 '>
              <div >
                <h2>Temp Min</h2>
              </div>
              <div className='flex gap-3'>
                <p>{lowTemp}</p>

                <img className='h-5' src={lowt} alt="" />
              </div>
            </div>

            <div className='flex  items-center text-white justify-between text-md p-2'>
              <div >
                <h2>Humidity</h2>
              </div>
              <div className='flex gap-3'>
                <p>{humiditi}</p>

                <img className='h-5' src={humidity} alt="" />
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

          <div className='flex justify-between px-6 py-5'>
            <img className='h-8' src={message} alt="" />
            <img className='h-6' src={silent} alt="" />

          </div>


          <div className='flex flex-col items-center'>
            <h1 className='text-2xl'>Weather Details</h1>
            <p className=' '></p>
            <img className='h-36' src={clouds} alt="" />
            <h1 className='text-5xl'>Air Quality</h1>

            <img className='' src={airQualityIndicator} alt="" />

          </div>







        </div>





        {/* container 3 */}

        <div className=" w-2/5 md:w-1/5   bg-black  opacity-90 text-white rounded-3xl text-center ">

          <div className='flex justify-between px-6 py-5 '>
            <img className='h-8' src={lefta} alt="" />
            <img className='h-8' src={settings} alt="" />

          </div>


          <div className='flex flex-col items-center'>
            <h1 className='text-2xl'>Forecast 4 days</h1>           
          </div>


          {/* Forecast */}

          <div className='flex justify-around p-1 m-4'>
            <div className='gradient-background rounded-lg p-1'>
              <h1>Monday</h1>
            </div>

            <div className='gradient-background rounded-lg p-1'>
              <h1>Monday</h1>
            </div>

            <div className='gradient-background rounded-lg p-1'>
              <h1>Monday</h1>
            </div>

            <div className='gradient-background rounded-lg p-1'>
              <h1>Monday</h1>
            </div>
          </div>







        </div>















      </div>



    </div>
  )
}

export default App;
