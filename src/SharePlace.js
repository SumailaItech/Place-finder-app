import { Modal } from './UI/Modal';

class PlaceFinder{
    constructor(){
        const addressForm =document.querySelector('form');
        const locateUserBtn = document.getElementById('locate-btn');

        locateUserBtn.addEventListener('click',this.locateUserHandler);
        addressForm.addEventListener('submit', this.findAddressHandler);
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
                console.log(coordinates);
        },error=>{
            modal.hide();
            alert("Could not locate you Unfortunately, Please enter your address manually");
        });
    }

findAddressHandler(){

    }
}

new PlaceFinder();