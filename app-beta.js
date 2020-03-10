const express = require("express");                    // made with postman and open weather website
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extend: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html")
});

app.post("/", function(req, res){
  const query  = req.body.cityName;
  const apiKey = "4c3ecc1a8f3294ae04e769ca473aa51b";     //my api key is here
  const unit   = "metric"
  const url    = "https://api.openweathermap.org/data/2.5/weather?q=" + query + apiKey + "&appid=";


    https.get(url, function(response) {
        console.log(response.statusCode);       //stateCode tell us if sucess or not positive 200 or 404 for errors

        response.on("data", function(data) {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;  //0 because is a array
            const icon = weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.write("<p>The weather is currently " + weatherDescription + "<p>");
            res.write("<h1>The Temperature in " +query + "is" + temp + "degrees Celcius.<h1>");
            res.write("<img src=" + imageURL +">");
            res.send();
    });
  });
})



app.listen(3000, function() {
  console.log("server is running on port 3000.");
})



// res.send and res.write are similar , we can only use 1 per project so use boths
