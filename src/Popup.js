import {addSaveButton} from "./Util.js";
export default class Popup{
    constructor (popupSelector){
        this.popupElement=document.querySelector(popupSelector);
        this.popupCloseButton = this.popupElement.querySelector('.popup__close-button')||
                                this.popupElement.querySelector('.popup__image-close-button'); //boton de cerrar       
        this._handleEscClose=this._handleEscClose.bind(this);
        this.setEventListeners();
    }
    open(){
        this.popupElement.classList.add("popup__opened");
        addSaveButton.classList.add("popup__button_disabled")
        document.addEventListener("keydown", this._handleEscClose);
    }
    close(){
        this.popupElement.classList.remove("popup__opened");
        document.addEventListener("keydown", this._handleEscClose);
    }
    _handleEscClose(evt){
        if(evt.key=== 'Escape'){
            this.close();
        }
            }
    _isClickOutside(evt){
        return evt.target.classList.contains("popup__opened");
        }
    setEventListeners(){
        //Eventos de todo
        this.popupCloseButton.addEventListener('click', () => this.close());
        this.popupElement.querySelector('.popup__container').addEventListener("click", (e)=>{
            if (e.target.matches(".popup__container")){
             this.close();
            }
            });
    }
}