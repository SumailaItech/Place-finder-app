import { Modal } from './UI/Modal';
import { Map } from './UI/Map';

class PlaceFinder{
    constructor(){
        const addressForm =document.querySelector('form');
        const locateUserBtn = document.getElementById('locate-btn');

        locateUserBtn.addEventListener('click',this.locateUserHandler.bind(this));
        addressForm.addEventListener('submit', this.findAddressHandler.bind(this));
    };

    

    selectPlace(coordinates){
        if(this.map){
            this.map.render(coordinates);
        }else{
            this.map = new Map(coordinates);
        }
    }

 locateUserHandler(){
        if(!navigator.geolocation){
            alert('Location feature is not supported in your browser,plaease use a modern browser');
            return;
        }
        const modal = new Modal('loading-modal-content','Loading location Please wait');
        modal.show();
        navigator.geolocation.getCurrentPosition(
            successResult=>{
                modal.hide();
                console.log(successResult);
                const coordinates={
                    lat: successResult.coords.latitude,
                    log: successResult.coords.longitude
                };
                this.selectPlace(coordinates);
        },error=>{
            modal.hide();
            alert("Could not locate you Unfortunately, Please enter your address manually");
        });
    }

findAddressHandler(event){
    event.preventDefault();
    const address = event.target.querySelector('input').value;
    }
}

new PlaceFinder();