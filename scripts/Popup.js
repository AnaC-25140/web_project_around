export default class Popup{
    constructor (popupSelector){
        this.popupElement=document.querySelector(popupSelector);
        this.popupCloseButton = this.popupElement.querySelector('.popup__close-button');//boton de cerrar
        this._handleEscClose=this._handleEscClose.bind(this);
        this.setEventListeners();
    }
    open(){
        this.popupElement.classList.add("popup__opened");
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
        document.addEventListener("click", (e)=>{
            if (e.target.matches(".popup__container")){
             this.close();
            }
            });
    }
    
}