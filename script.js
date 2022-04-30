const api = 'a94fd89b160991ae9706e0019ed93d41';



if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition((position) => {
    // Storing Longitude and Latitude in variables
    long = position.coords.longitude;
    lat = position.coords.latitude;

    const base = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${api}&units=metric`;

  });
}
