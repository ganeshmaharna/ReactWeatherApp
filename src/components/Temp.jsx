import React from 'react';
import {useEffect,useState} from 'react';
import Weathercard from './weathercard';
import "./style.css";
// 8684fb99aa1e2eb0b5329c1cb2c1cad5
// https://api.openweathermap.org/data/2.5/weather?q=Delhi&units=metric&appid=dddac63500b1e66cbab18dde60c2e52b
const Temp = () => {
    const [searchvalue,setSearchvalue]=useState("Balasore");
    const [tempInfo,setTempInfo]=useState("");
    const getWeatherInfo= async()=>{
        try{
            // let url=`https://api.openweathermap.org/data/2.5/weather?q=${searchvalue}&units=metric&appid=349f49e3561d9ddaa50339b166f187a6`;
            let url=`https://api.openweathermap.org/data/2.5/weather?q=${searchvalue}&units=metric&appid=349f49e3561d9ddaa50339b166f187a6`;

            const res = await fetch(url);
            const data = await res.json();

            const {temp,humidity,pressure}=data.main;
            const {main:weathermood}=data.weather[0];
            const {name}=data;
            const {speed}=data.wind;
            const {country,sunset}=data.sys;

            const myNewWeatherInfo = {
                temp,
                humidity,
                pressure,
                weathermood,
                name,
                speed,
                country,
                sunset,
            };
            setTempInfo(myNewWeatherInfo);
            
        }catch(error){
            console.log(error);
        }
    }
    useEffect(()=>{
        getWeatherInfo();
    },[])

  return (
    <>
      <div className="wrap">
        <div className="search">
          <input
            type="search"
            placeholder="search..."
            autoFocus
            id="search"
            className="searchTerm"
            value={searchvalue}
            onChange={(e)=>setSearchvalue(e.target.value)}
          />

          <button
            className="searchButton"
            type="button"
            onClick={getWeatherInfo()}>
            Search
          </button>
        </div>
      </div>

      {/* Our temp card */}
      <Weathercard tempInfo={tempInfo}/>
      
    </>
  )
}

export default Temp
