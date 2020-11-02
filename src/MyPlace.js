import { Map } from './UI/Map';


class LoadMyPlace{
    constructor(coordinates, address){
        new Map(coordinates);
        const headerHtml = document.querySelector('header h1');
        headerHtml.textContent = this.address;
    }
}

const url = new URL(location.href);
const queryParams = url.searchParams;
// const coords ={
//     lat: parseFloat(queryParams.get('lat')),
//     lng: +queryParams.get('lng')
// }

// const address = queryParams.get('address');
const locId = queryParams.get('location');
fetch('http://loation:3000/location/' + locId)
.then(response =>{
    if(response.status ===404){
        throw new Error('Could not find location!');
    }
    return response.json();
})
.the(data =>{
    new LoadMyPlac(data.coordinates, data.address);
})
.catch(err=>{
    alert(err.message);
})