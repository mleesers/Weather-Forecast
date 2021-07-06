function getApi(){
    city = document.getElementById("city").value;
    requestUrlMain = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=0a1489eac7ff07297a4595ebe061c3c8`
    fetch(requestUrlMain)
    .then(function (response){
        return response.json();
    })
    .then(function (data) {
        document.querySelector(".City").textContent = data.name;
        console.log(data)
        console.log(data.main.temp)
        temperature = ((data.main.temp -273.15) * (9/5) + 32);
        document.getElementById("temp").textContent = "Temp: " + temperature.toFixed(2) + "\u00B0F";
        document.getElementById("wind").textContent = "Wind: " + data.wind.speed;
        document.getElementById("humidity").textContent = "Humidity: " + data.main.humidity;
        lati = data.coord.lat;
        long = data.coord.lon;
        requestUrlSecondary = `https://api.openweathermap.org/data/2.5/onecall?lat=${lati}&lon=${long}&exclude=alerts,minutely,hourly&appid=0a1489eac7ff07297a4595ebe061c3c8`
        getSecondApi();
        return requestUrlSecondary;
    });
    
}
function getSecondApi(){
    fetch(requestUrlSecondary)
    .then(function (response){
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        document.getElementById("UV").textContent = "UV index: " + data.current.uvi;
    });
}
document.querySelector(".search").addEventListener("click", getApi);
