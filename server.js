const express = require("express");
const axios = require("axios");
const path = require("path");
const hbs = require("hbs");
const app = express();
require('dotenv').config();
const PORT = 3030;
const API_KEY = process.env.API_KEY;

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static("public"));

let cities = ["Kyiv", "Vinnytsia", "Lviv", "Odesa"];

app.get("/", (req, res) => {
  res.render("index", { cities });
});

app.get("/weather/:city", async (req, res) => {
  const city = req.params.city;
  console.log(city);
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
    );
    const weatherData = response.data;
    console.log(weatherData);
    const description = weatherData.weather[0].description;
    const icon = weatherData.weather[0].icon;
    res.render("city_weather", { weather: weatherData, description, icon });
  } catch (error) {
    res.status(404).send("City is not found");
  }
});

app.get("/weather", async (req, res) => {
  const city = req.query.city;
  if (!city) return res.send("Enter city in URL: /weather?city=yourCity");

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
    );
    const weatherData = response.data;
    const description = weatherData.weather[0].description;
    const icon = weatherData.weather[0].icon;
    res.render("city_weather", { weather: weatherData, description, icon });
  } catch (error) {
    res.status(404).send("City is not found");
  }
});

app.listen(PORT, () => {
  console.log(`Server: http://localhost:${PORT}`);
});
