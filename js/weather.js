const API_KEY = "3105cced498d7f9950d529a477e45152"

function onGeoOk(position){
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    fetch(url)
    .then((response) => response.json())
    .then((data) => {
        const weather = document.querySelector("#weather span:first-child")
        const city = document.querySelector("#weather span:last-child")
        // const icon = document.querySelector(".weather_icon")
        const weatherIcon = data.weather[0].icon
        const weatherIconUrl = `<img src = "https://openweathermap.org/img/wn/${weatherIcon}@2x.png">`
        console.log(weatherIcon)
        city.innerHTML = weatherIconUrl;
        weather.innerText = `${data.name} / ${data.main.temp}℃`
    });
}
function onGeoError(){
    alert("당신의 위치를 얻지 못했습니다.")
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError)

