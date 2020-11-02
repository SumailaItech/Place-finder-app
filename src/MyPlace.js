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
const coords ={
    lat: parseFloat(queryParams.get('lat')),
    lng: +queryParams.get('lng')
}

const address = queryParams.get('address');

new LoadMyPlace(coords, address);