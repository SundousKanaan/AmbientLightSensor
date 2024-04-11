// Check if AmbientLightSensor is supported
const lightLevel = document.getElementById("light-level");
const lamp = document.querySelector("#lamp .glass");

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

      console.log({ illuminancePercentage });
      const bodyColor = `rgba(0, 0, 0, ${illuminancePercentage})`; // R, G, B, A
      document.body.style.backgroundColor = bodyColor;

      // Set text color
      const textColor = `rgba(255, 255, 255, ${1 - illuminancePercentage})`; // R, G, B, A
      document.body.style.color = textColor;

      // Set lamp color
      const lampColor = `rgba(255, 255, 0, ${illuminancePercentage})`; // R, G, B, A
      lamp.style.backgroundColor = lampColor;

      // Set lamp box-shadow intensity
      const shadowIntensity = illuminancePercentage * 10; // Scale up to make the effect more visible
      const boxShadowValue = `0 0 ${shadowIntensity}px ${shadowIntensity}px rgba(255, 255, 0, ${illuminancePercentage})`;
      lamp.style.boxShadow = boxShadowValue;
    } else {
      console.error("No illuminance value");
    }
  };

  // Start the sensor
  sensor.start();
} else {
  // If not supported, provide a fallback
  lightLevel.textContent = "Ambient Light Sensor not supported";
}
