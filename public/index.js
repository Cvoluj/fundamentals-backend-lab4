window.addEventListener("load", () => {
  if (!navigator.geolocation) {
    console.log("Geolocation is not supported by this browser.");
    return;
  }
  navigator.geolocation.getCurrentPosition(handlePosition);
});

async function handlePosition({ coords: { latitude, longitude } }) {
  try {
    const response = await axios.get("/api/weather", {
          params: {
            lat: latitude,
            lon: longitude,
        },
    });

    const { name: city } = response.data;
    const citiesContainer = document.querySelector(".container-city");

    if (citiesContainer && city) {
      const newCity = document.createElement("a");
      newCity.href = `/weather/${city}`;
      newCity.textContent = `Your location: ${city}`;
      newCity.classList.add("btn_to_weather", "btn_to_weather--your_city");
      citiesContainer.appendChild(newCity);
    }
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}
