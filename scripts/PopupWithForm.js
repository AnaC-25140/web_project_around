import { Popup } from "./Popup.js";
export class PopupWithForm extends Popup{
    constructor (handleFormSubmit, popupSelector){
        super(popupSelector); //llama al constructor padre y le manda el selector, el padre esta en pop up
        this.handleFormSubmit=handleFormSubmit; //la guardo
        this._formElement=this._popupElement.querySelector(".popup__form");
       
        
    }
    //Aqui voy a recoger valores y guardarlos en un objeto 
    _getInputValues(){ 
        const formValues={};
        this._inputList.forEach(input => {
            formValues[input.name]=input.value;
        });
        return formValues;
    }
    setEventListeners(){
        super.setEventListeners(); //super solo para metodos y se va al del padre
        this._formElement.addEventListener("submit", (evt)=>{ //this.popupSelector.addEventListener("submit", (evt)=>{
            evt.preventDefault();
            this.handleFormSubmit(this._getInputValues());
        });

    }
}
// const AddCardPopup= new PopupWithForm(()=>{
//     //logica para procesar info  popup
// }, "#editProfile");
// AddCardPopup.setEventListener();