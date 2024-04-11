// Check if AmbientLightSensor is supported
let lightLevel = document.getElementById("light-level");

if ("AmbientLightSensor" in window) {
  const sensor = new AmbientLightSensor();

  // Update light level when the sensor value changes
  sensor.onreading = () => {
    if (sensor.illuminance !== null) {
      console.log("sensor.illuminance", sensor.illuminance);
      lightLevel.textContent = `Light Level: ${sensor.illuminance} lux`;
    } else {
      console.log("sensor.illuminance", sensor.illuminance);
    }
  };

  // Start the sensor
  sensor.start();
} else {
  // If not supported, provide a fallback
  lightLevel.textContent = "Ambient Light Sensor not supported";
}
