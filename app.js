const express = require("express");
const https   = require("https");

const app = express();

app.get("/",function(req, res){
// made with postman and open weather website
const url = "https://api.openweathermap.org/data/2.5/weather?q=Brno&appid=4c3ecc1a8f3294ae04e769ca473aa51b&units=metric"

https.get(url, function(response){
console.log(response.statuscode);           //state code tell us if sucess or not positive 200 or 400 for erros
})

res.send("server is up and running.");
})





app.listen(3000, function (){
    console.log("server is running on port 3000.");
})
