import { Popup } from "./Popup";
export class PopupWithForm extends Popup{
    constructor (handleFormSubmit, popupSelector){
        super(popupSelector);
        this.handleFormSubmit=handleFormSubmit;
       
    }
    _getInputValues(){}
    setEventListener(){
        super.setEventListener();
        super.popupELement.addEventListener("submit", (evt)=>{
            evt.preventDefault();
            this.handleFormSubmit();
        });

    }
}
const AddCardPopup= new PopupWithForm(()=>{
    //logica para procesar info  popup
}, "#popup-cards");
AddCardPopup.setEventListener();