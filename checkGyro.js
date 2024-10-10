function checkDevice()
{
    // For iOS devices.
    if (typeof DeviceOrientationEvent.requestPermission === 'function') 
    {
        
        // Search Gyroscope
        DeviceOrientationEvent.requestPermission().then(function (response) 
        {
            if (response === 'granted')
                checkGyroscope();
            else
                alert("Permission denied for gyroscope access by user.");
        }).catch(function (error)
        {
            alert("Error requesting gyroscope access: " + error);
        });


        // Search Motion Sensor
        DeviceMotionEvent.requestPermission().then(function (response) 
        {
            if (response === 'granted')
                checkGyroscope();
            else
                alert("Permission denied for motion sensor access by user.");
        }).catch(function (error) 
        {
            alert("Error requesting motion sensor access: " + error);
        });

    }
    else 
    {
        // For Non-iOS devices.
        checkGyroscope();
    }
}

function checkGyroscope() 
{
    // Check if DeviceOrientationEvent is supported
    if (window.DeviceOrientationEvent) 
    {
        window.addEventListener('deviceorientation', function (event) 
        {
            if (event.alpha !== null || event.beta !== null || event.gamma !== null) 
            {
                
            } 
            else 
                alert("You need to enable Motion Sensor in your browser's site settings.");

        }, { once: true });
    } 
    else 
    {
        alert("You need to enable Motion Sensor in your browser's site settings.");
    }

    // Check if DeviceMotionEvent is supported
    if (window.DeviceMotionEvent) 
    {
        window.addEventListener('devicemotion', function (event) 
        {
            if (event.rotationRate && (event.rotationRate.alpha || event.rotationRate.beta || event.rotationRate.gamma)) 
            {

            } 
            else 
                alert("You need to enable Motion Sensor in your browser's site settings.");
            
        }, { once: true });
    }
}

document.addEventListener("DOMContentLoaded", function () 
{
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;

    // If mobile browser
    if (/android/i.test(userAgent) || /iPad|iPhone|iPod/.test(userAgent) && !window.MSStream)
    {
        alert("Check Mobile Device");
        checkDevice();
    }
    else
    {
        alert("Non-Mobile browser");
    }
});