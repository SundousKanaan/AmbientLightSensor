// Check if AmbientLightSensor is supported
let lightLevel = document.getElementById("light-level");
let lamp = document.querySelectord("#lamp .glass");

if ("AmbientLightSensor" in window) {
  const sensor = new AmbientLightSensor();

  // Update lamp color and shadow when the sensor value changes

  sensor.onreading = () => {
    if (sensor.illuminance !== null) {
      // Convert illuminance to a value between 0 and 1
      const illuminancePercentage = sensor.illuminance / 1000; // Divided by 1000 for normalization
      // Set lamp color
      const lampColor = `rgba(255, 255, 0, ${illuminancePercentage})`; // R, G, B, A
      document.documentElement.style.setProperty("--lamp-color", lampColor);
      // Set lamp box-shadow intensity
      const shadowIntensity = illuminancePercentage * 10; // Scale up to make the effect more visible
      const boxShadowValue = `0 0 ${shadowIntensity}px ${shadowIntensity}px rgba(255, 255, 0, ${illuminancePercentage})`;
      document.getElementById("lamp").style.boxShadow = boxShadowValue;
    }
  };

  // Update light level when the sensor value changes
  sensor.onreading = () => {
    if (sensor.illuminance !== null) {
      console.log("sensor.illuminance", sensor.illuminance);

      // De methode .toFixed(2) wordt gebruikt om het aantal decimalen te beperken tot twee cijfers na de komma.
      lightLevel.textContent = `Light Level: ${sensor.illuminance.toFixed(
        2
      )} lux`;
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
