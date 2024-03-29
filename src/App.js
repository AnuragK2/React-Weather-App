import React, { useState, useEffect } from 'react'
import './App.css'
import Header from './components/Header'
import Inputs from './components/Inputs'
import TandLoc from './components/TandLoc'
import Temp from './components/Temp'
import Forecast from './components/Forecast'
import getFormattedWeatherData from "./Services/Weatherservice";
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import alanBtn from '@alan-ai/alan-sdk-web';



const App = () => {
    const [query, setQuery] = useState({ q: "Delhi" });
    const [units, setUnits] = useState("metric");
    const [weather, setWeather] = useState(null);

    useEffect(() => {
        var alanBtnInstance = alanBtn({
            key: '52ee84c6f7d4c5543c1aa7e4ce21d7372e956eca572e1d8b807a3e2338fdd0dc/stage',
            onCommand: ({ command, article }) => {
                if (command === 'show') {
                    setQuery({ q: article });
                }
            },
            onButtonState: async function (status) {
                if (status === 'ONLINE') {
                    if (!this.greetingWasSaid) {
                        await alanBtnInstance.activate();
                        alanBtnInstance.playText("Hello! I'm Alan. I am your voice assistant.");
                        alanBtnInstance.playText("To search for weather of any location just press the microphone button and say: Show me weather of.....then the city name");
                        this.greetingWasSaid = true
                    }
                }
            },
        });
    }, []);


    useEffect(() => {
        const fetchWeather = async () => {
            const message = query.q ? query.q : "current location.";
            await getFormattedWeatherData({ ...query, units }).then((data) => {
                setWeather(data);
                toast.success("Successfully fetched weather for " + message, { theme: "dark" });
            });
        };
        fetchWeather();
    }, [query, units]);

    const formatBackground = () => {
    if (!weather)
      return 'from-cyan-700 to-blue-700'
    const threshold = units === 'metric' ? 20 : 60
    if (weather.temp <= threshold) return 'from-cyan-700 to-blue-700'
    return 'from-yellow-700 to-orange-700'
  }

    return (
        <div className={`mx-auto max-w-screen-md  items-center justify-center
    mt-20 py-5 px-32 bg-gradient-to-br
    from-cyan-700 to-blue-700
    h-fit shadow-xl shadow-gray-400 ${formatBackground()}`}>
            <Header setQuery={setQuery} />
            <Inputs setQuery={setQuery} setUnits={setUnits} units={units} />
            {weather && (
                <>
                    <TandLoc weather={weather} />
                    <Temp weather={weather} />
                    <Forecast title="HOURLY" list={weather.hourly} />
                    <Forecast title="DAILY" list={weather.daily} />
                </>
            )}
            <ToastContainer
                position="top-right"
                theme="colored"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick
                style={{ width: '400px' }}
            />
        </div>
    )
}

export default App