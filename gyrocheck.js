document.addEventListener("DOMContentLoaded", function () {
    const resultDiv = document.getElementById('result');
    const enableButton = document.getElementById('enableSensorsButton');

    function checkGyroscope() {
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

        // Check if DeviceMotionEvent is supported
        if (window.DeviceMotionEvent) {
            window.addEventListener('devicemotion', function (event) {
                if (event.rotationRate && (event.rotationRate.alpha || event.rotationRate.beta || event.rotationRate.gamma)) {
                    resultDiv.innerHTML = "Your device has motion sensors, including a gyroscope.";
                } else {
                    resultDiv.innerHTML = "Your device does not have motion sensors.";
                }
            }, { once: true });
        }
    }

    // Check for iOS permission
    if (typeof DeviceOrientationEvent.requestPermission === 'function') {
        enableButton.style.display = 'block';
        resultDiv.innerHTML = "Gyroscope access is restricted. Please allow access.";

        enableButton.addEventListener('click', function () {
            DeviceOrientationEvent.requestPermission()
                .then(function (response) {
                    if (response === 'granted') {
                        resultDiv.innerHTML = "Gyroscope access granted.";
                        checkGyroscope();
                    } else {
                        resultDiv.innerHTML = "Permission denied for gyroscope access.";
                    }
                })
                .catch(function (error) {
                    resultDiv.innerHTML = "Error requesting gyroscope access: " + error;
                });

            DeviceMotionEvent.requestPermission()
                .then(function (response) {
                    if (response === 'granted') {
                        checkGyroscope();
                    }
                })
                .catch(function (error) {
                    resultDiv.innerHTML = "Error requesting motion sensor access: " + error;
                });
        });
    } else {
        // Non-iOS devices, check directly
        checkGyroscope();
    }
});
