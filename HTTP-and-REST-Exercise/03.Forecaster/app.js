function attachEvents() {
    document.getElementById('submit').addEventListener('click', onClick)
    const weatherSymbols = {
        'Sunny': '☀',
        'Partly sunny': '⛅',
        'Overcast': '☁',
        'Rain': '☂',
        'Degrees': '°'
    }

    async function onClick() {
        const locationInput = document.getElementById('location').value;
        document.getElementById('location').value = ''
        document.getElementById('forecast').style.display = 'block';
        
        const locationsList = await (await fetch(`http://localhost:3030/jsonstore/forecaster/locations`)).json()
        const searchedLocation = locationsList.find(locationObject =>
            locationObject.name.toLowerCase() === locationInput.toLowerCase())
        const code = searchedLocation.code

        const dailyWeather = await (await fetch(`http://localhost:3030/jsonstore/forecaster/today/${code}`)).json()
        let { name, forecast } = dailyWeather
        const { low, high, condition } = forecast

        function createSpan() {
            return document.createElement('span')
        }

        // Current day info BIG DIV CONTAINER
        const current = document.getElementById('current')
        //SMALL DIV
        const dailyForecastContainer = (document.createElement('div'))
        dailyForecastContainer.classList.add('forecasts')
        current.appendChild(dailyForecastContainer)

        //Symbol
        const conditionSymbol = createSpan()
        conditionSymbol.classList.add('condition', 'symbol');
        conditionSymbol.textContent = weatherSymbols[condition]
        dailyForecastContainer.appendChild(conditionSymbol)

        //SPAN Container for TEXT
        const textSpan = createSpan()
        textSpan.classList.add('condition')
        dailyForecastContainer.appendChild(textSpan)
        //name
        const nameSpan = createSpan()
        nameSpan.textContent = name
        nameSpan.classList.add('forecast-data')
        textSpan.appendChild(nameSpan)
        //degrees
        const deg = createSpan()
        deg.classList.add('forecast-data')
        deg.textContent = `${low}${weatherSymbols.Degrees}/${high}${weatherSymbols.Degrees}`
        textSpan.appendChild(deg)
        //weather
        const weather = createSpan()
        weather.classList.add('forecast-data')
        weather.textContent = condition
        textSpan.appendChild(weather)

        //SECOND BIG DIV
        const secondContainer = document.getElementById('upcoming')
        //small second div
        const secondSmallContainer = document.createElement('div')
        secondSmallContainer.classList.add('forecast-info')
        
        secondContainer.appendChild(secondSmallContainer)
        

        const data = await (await
            fetch(`http://localhost:3030/jsonstore/forecaster/upcoming/${code}`)).json()

        const arrayThreeDays = data.forecast
        
        for (let forecastObj of arrayThreeDays) {
            const secondSmallContainerFinal = document.createElement('span')
            secondSmallContainerFinal.classList.add('upcoming')
            secondSmallContainer.appendChild(secondSmallContainerFinal)
            let { condition, high, low } = forecastObj

            const symbol = createSpan()
            symbol.classList.add('symbol');
            symbol.textContent = weatherSymbols[condition]
            secondSmallContainerFinal.appendChild(symbol)

            const temperature = createSpan()
            temperature.textContent = `${low}${weatherSymbols.Degrees}/${high}${weatherSymbols.Degrees}`
            temperature.classList.add('forecast-data')
            secondSmallContainerFinal.appendChild(temperature)

            const cond = document.createElement('span')
            cond.textContent = condition
            cond.classList.add('forecast-data')
            secondSmallContainerFinal.appendChild(cond)
        }
    }
}

attachEvents();