
//Fetch traffic lights info from API
async function getTrafficLightInformation() {
    const response = await fetch( 'https://xompasssuiteadminstg.z20.web.core.windows.net/semaphore.json' );
    return response.json()
}

//Sleep for t seconds
function sleep( t ) {
    return new Promise(resolve => setTimeout(resolve, t*1000));
}

//Turn on/off a single light
async function changeSingleLight( color, duration ) {
    let trafficLight = document.getElementById(`${ color }-light`)
    trafficLight.className = `traffic-light ${ color } active`
    await sleep(duration);
    trafficLight.className = `traffic-light ${ color }`
    return
}

//Loop through traffic lights
async function changeLights( lights, currentLightColor ) {
    let isFirstTime = true;
    const orderedLights = [lights[0], lights[2], lights[1]]
    while ( true ){
        for( i = 0; i < orderedLights.length; i++) {
            const { color, duration } = orderedLights[i];
            if ( isFirstTime && color === currentLightColor ){
                await changeSingleLight( color, duration )
                isFirstTime = false;
            }
            else if ( !isFirstTime ){
                await changeSingleLight( color, duration )
            }
        }
    }

}

getTrafficLightInformation()
.then(response => changeLights( response.lights, response.currentLightColor ))