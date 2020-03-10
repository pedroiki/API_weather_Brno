const express = require("express");
const https = require("https");

const app = express();

app.get("/", function(req, res) {  // made with postman and open weather website

  const url = "https://api.openweathermap.org/data/2.5/weather?q=Brno&appid=4c3ecc1a8f3294ae04e769ca473aa51b&units=metric";

  https.get(url, function(response) {
      console.log(response.statusCode); //stateCode tell us if sucess or not positive 200 or 404 for errors

      response.on("data", function(data) {
          const weatherData = JSON.parse(data)
          const temp = weatherData.main.temp
          const weatherDescription = weatherData.weather[0].description  //0 because is a array
          const icon = weatherData.weather[0].icon
          const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
          res.write("<p>The weather is currently " + weatherDescription + "<p>");
          res.write("<h1>The Temperature for Brno now is" + temp + "degrees Celcius.<h1>");
          res.write("<img src=" + imageURL +">");
          res.send()   // res.send and res.write are similar , we can only use 1 per project so use boths
      })
  })
})



app.listen(3000, function() {
  console.log("server is running on port 3000.");
})
