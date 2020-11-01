const GOOGLE_API_KEY = 'AIzaSyCrAR7rJk_PECP1XXAeaTkaPPnDoTU61z0';

export async function getCoordsFromAddress(address){
    const urlAddress = encodeURI(address);
    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${urlAddress}&key=${GOOGLE_API_KEY}`);

    if(!response.ok){
        throw new Error('Fail to fetch coordinates - Please try again later');
    }

    const data = await response.json();
    if(data.error_message){
        throw new Error(data.error_message);
    }

    const coordinates = data.result[0].geometry.location;
    return coordinates;
}