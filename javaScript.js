// Check if AmbientLightSensor is supported
let lightLevel = document.getElementById("light-level");
let lamp = document.querySelector("#lamp .glass");

if ("AmbientLightSensor" in window) {
  const sensor = new AmbientLightSensor();

  // Update lamp color and shadow when the sensor value changes

  sensor.onreading = () => {
    if (sensor.illuminance !== null) {
      // De methode .toFixed(2) wordt gebruikt om het aantal decimalen te beperken tot twee cijfers na de komma.
      lightLevel.textContent = `Light Level: ${sensor.illuminance.toFixed(
        2
      )} lux`;

      // Convert illuminance to a value between 0 and 1
      const illuminancePercentage = sensor.illuminance / 1000; // Divided by 1000 for normalization

      const bodyColor = `rgba(0, 0, 0, ${illuminancePercentage})`; // R, G, B, A
      document.documentElement.style.setProperty("--body-color", bodyColor);
      // Set text color
      const tekstColor = `rgba(225,225, 225, ${illuminancePercentage})`; // R, G, B, A
      document.documentElement.style.setProperty("--tekst-color", tekstColor);
      // Set lamp color
      const lampColor = `rgba(255, 255, 0, ${illuminancePercentage})`; // R, G, B, A
      document.documentElement.style.setProperty("--lamp-color", lampColor);
      // Set lamp box-shadow intensity
      const shadowIntensity = illuminancePercentage * 10; // Scale up to make the effect more visible
      const boxShadowValue = `0 0 ${shadowIntensity}px ${shadowIntensity}px rgba(255, 255, 0, ${illuminancePercentage})`;
      document.getElementById("lamp").style.boxShadow = boxShadowValue;
    }
  };

  // Start the sensor
  sensor.start();
} else {
  // If not supported, provide a fallback
  lightLevel.textContent = "Ambient Light Sensor not supported";
}
