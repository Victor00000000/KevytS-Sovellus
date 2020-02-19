window.addEventListener('load', event => {
  const status = document.querySelector('#status')
  const loc = document.querySelector('#loc')
  if (!navigator.geolocation) {
    status.innerHTML = 'Geolocation is not suppoerted by your browser'
  } else {
    navigator.geolocation.getCurrentPosition(success, error)
  }
  function success (pos) {
    status.innerHTML = ''
    const lat = pos.coords.latitude
    const long = pos.coords.longitude
    fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&APPID=dca615a2cf7974cc926dad6d126f9311`)
      .then(httpResponce => { return httpResponce.json() })
      .then(jsonObject => {
        loc.innerHTML = 'Temperatue at your location: ' + jsonObject.main.temp + '°C'
        document.querySelector('#icon').innerHTML = `<img src="http://openweathermap.org/img/wn/${jsonObject.weather[0].icon}@2x.png">`
      })
  }

  function error () {
    status.innerHTML = 'Unable to retreive your location'
  }
})
