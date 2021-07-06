today = moment();
document.querySelector(".date").textContent = " (" + today.format("M/D/YYYY") + ")";
for(i=1;i<=5;i++){
    date = today.add(1,'days');
    document.getElementById("date"+i).textContent = date.format("M/D/YYYY");
}





function getApi(){
    city = document.getElementById("city").value;
    requestUrlMain = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=0a1489eac7ff07297a4595ebe061c3c8`
    fetch(requestUrlMain)
    .then(function (response){
        return response.json();
    })
    .then(function (data) {
        document.querySelector(".City").textContent = data.name;
        temperature = ((data.main.temp -273.15) * (9/5) + 32);
        document.getElementById("temp").textContent = "Temp: " + temperature.toFixed(2) + "\u00B0F";
        document.getElementById("wind").textContent = "Wind: " + data.wind.speed + "mph";
        document.getElementById("humidity").textContent = "Humidity: " + data.main.humidity + "%";
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
        document.getElementById("UV").textContent = "UV index: " + data.current.uvi;
        for(i=0;i<5;i++){
            temperature = ((data.daily[i].temp.max -273.15) * (9/5) + 32);
            console.log(temperature)
            document.getElementById("temp" + (i+1)).textContent = "Temp: " + temperature.toFixed(2) + "\u00B0F";
            document.getElementById("wind" + (i+1)).textContent = "Wind: " + data.daily[i].wind_speed + "mph";
            document.getElementById("humidity" + (i+1)).textContent = "Humidity: " + data.daily[i].humidity + "%";
        }
    });
}
document.querySelector(".search").addEventListener("click", getApi);
