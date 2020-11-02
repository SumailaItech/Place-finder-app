import { Modal } from './UI/Modal';
import { Map } from './UI/Map';
import { getCoordsFromAddress,getAddressFromCoords } from './Utility/Location';
import { ConcatSource } from 'webpack-sources/lib';

class PlaceFinder{
    constructor(){
        const addressForm =document.querySelector('form');
        const locateUserBtn = document.getElementById('locate-btn');
        this.shareBtn = document.getElementById('share-btn');

        locateUserBtn.addEventListener('click',this.locateUserHandler.bind(this));
       this.shareBtn.addEventListener('click',this.shareLinkHandler);
        addressForm.addEventListener('submit', this.findAddressHandler.bind(this));
    };

   shareLinkHandler(){
    const shareLinkElement = document.getElementById('share-link');
    if(!navigator.clipboard){
        shareLinkElement.select();
        return;
    }

    navigator.clipboard.writeText(shareLinkElement.value)
    .then(()=>{
        alert('Address has been saved to the clipboard');
    })
    .catch(err =>{
        console.log(err);
    });
   }

    selectPlace(coordinates, address){
        if(this.map){
            this.map.render(coordinates);
        }else{
            this.map = new Map(coordinates);
        }

        this.shareBtn.disabled = false;
        const shareLinkElement = document.getElementById('share-link');
        shareLinkElement.value =`${location.origin}/my-place?address=${encodeURI(address)}&lat=${coordinates.lat}&lng=${coordinates.lng}`
    }

  locateUserHandler(){
        if(!navigator.geolocation){
            alert('Location feature is not supported in your browser,plaease use a modern browser');
            return;
        }
        const modal = new Modal('loading-modal-content','Loading location Please wait');
        modal.show();
        navigator.geolocation.getCurrentPosition(
         async successResult=>{
                modal.hide();
                const coordinates={
                    lat: successResult.coords.latitude,
                    lng: successResult.coords.longitude
                };
                console.log(coordinates);
                const address = await getAddressFromCoords(coordinates);
                this.selectPlace(coordinates, address);
        },error=>{
            modal.hide();
            alert("Could not locate you Unfortunately, Please enter your address manually");
        });
    }

async findAddressHandler(event){
    event.preventDefault();
    const address = event.target.querySelector('input').value;
    if(!address || address.trim ===0){
        alert('Invalid Address entered - Please try again with valid address');
        return
        }

        const modal = new Modal('loading-modal-content','Loading location Please wait');
        modal.show();
        try{
        const coordinates = await getCoordsFromAddress(address);
        this.selectPlace(coordinates, address);
        }catch(err){
            alert(err.message);
        }

        modal.hide();
    }
}

new PlaceFinder();