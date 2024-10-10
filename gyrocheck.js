document.addEventListener("DOMContentLoaded", function () {
    const resultDiv = document.getElementById('result');

    // Check if DeviceOrientationEvent is supported
    if (window.DeviceOrientationEvent) {
        window.addEventListener('deviceorientation', function (event) {
            if (event.alpha !== null || event.beta !== null || event.gamma !== null) {
                resultDiv.innerHTML = "Your device has a gyroscope.";
            } else {
                resultDiv.innerHTML = "Your device does not seem to have a gyroscope.";
            }
        }, { once: true });
    } else {
        resultDiv.innerHTML = "Your browser does not support DeviceOrientationEvent.";
    }

    // For additional checks, we can use DeviceMotionEvent for motion data
    if (window.DeviceMotionEvent) {
        window.addEventListener('devicemotion', function (event) {
            if (event.rotationRate && (event.rotationRate.alpha || event.rotationRate.beta || event.rotationRate.gamma)) {
                resultDiv.innerHTML = "Your device has motion sensors, including a gyroscope.";
            } else {
                resultDiv.innerHTML = "Your device does not have motion sensors.";
            }
        }, { once: true });
    }
});
