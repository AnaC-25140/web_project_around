import Popup from "./Popup.js";

export class PopupWithForm extends Popup{
    constructor (popupSelector, handleFormSubmit ){
        super(popupSelector); //llama al constructor padre y le manda el selector, el padre esta en pop up
        this.handleFormSubmit=handleFormSubmit; //la guardo        
    }
    //Aqui voy a recoger valores y guardarlos en un objeto 
    _getInputValues(){ 
        const formValues={};
        const formElement=this.popupElement.querySelector("form");
        Array.from(formElement.elements).forEach(input => {
           // console.log(input)
            if(input.name){
                formValues[input.name]=input.value;
            }            
        });
       //console.log(formValues);
        return formValues;
    }
    setEventListeners(){
        super.setEventListeners(); //super solo para metodos y se va al del padre
        const formElement=this.popupElement.querySelector("form");
        formElement.addEventListener("submit", (evt)=>{ //this.popupSelector.addEventListener("submit", (evt)=>{
            evt.preventDefault();
            this.handleFormSubmit(this._getInputValues()) 
            this.close();           
        });
    }
    close(){
        super.close();
        const formElement=this.popupElement.querySelector("form");
        formElement.reset();
    }
}
