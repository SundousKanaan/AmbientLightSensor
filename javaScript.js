// Check if AmbientLightSensor is supported
const lightLevel = document.getElementById("lux");
const gloeiLamp = document.querySelector(".gloeiLamp");
const bodyElement = document.querySelector("body");

if ("AmbientLightSensor" in window) {
  // Create a new AmbientLightSensor object
  const sensor = new AmbientLightSensor();

  // Update lamp color and shadow when the sensor value changes

  sensor.onreading = () => {
    if (sensor.illuminance === null || sensor.illuminance === 0) {
      bodyElement.classList.add("dark");
    }

    if (sensor.illuminance !== null) {
      // De methode .toFixed(2) wordt gebruikt om het aantal decimalen te beperken tot twee cijfers na de komma.
      lightLevel.textContent = `Light Level: ${sensor.illuminance.toFixed(
        2
      )} lux`;
      bodyElement.classList.remove("dark");

      const glowIntensity = sensor.illuminance.toFixed(0) * 2; // Adjust the multiplier as needed
      const glowSpread = sensor.illuminance.toFixed(0) / 2; // Adjust the divider as needed

      gloeiLamp.style.boxShadow = `0 0 ${glowIntensity}px ${glowSpread}px var(--gloed)`;
    }
  };

  // Start the sensor
  sensor.start();
} else {
  // If not supported, provide a fallback
  lightLevel.textContent = "Ambient Light Sensor not supported";
}
