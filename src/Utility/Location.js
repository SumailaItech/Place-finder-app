const GOOGLE_API_KEY = 'AIzaSyB3BB2_iMDEnxtN8E7EhALF-8-vV9Ij3tQ';

export async function getCoordsFromAddress(address){
    const urlAddress = encodeURI(address);
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${urlAddress}&key=${GOOGLE_API_KEY}`);

    if(!response.ok){
        throw new Error('Fail to fetch coordinates - Please try again later');
    }

    const data = await response.json();
    if(data.erro_message){
        throw new Error(data.erro_message);
    }

    console.log(data);
}