export class Popup{
    constructor (popupSelector){
        this.popupSelector=document.querySelector(popupSelector);
        this.popupCloseButton=this.popupSelector.querySelector("popup__close");
        this._handleEscClose=this._handleEscClose.bind(this);
    }
    open(){
        this.popupSelector.classList.add("popup__opened");
        document.addEventListener("click", this._handleEscClose);
    }
    close(){
        this.popupSelector.classList.remove("popup__opened");
        document.addEventListener("click", this._handleEscClose);
    }
    _handleEscClose(evt){
if(evt.key=== 'Escape'){
    this.close();
}
    }
    _isClickOutside(evt){
        return evt.target.classList.contains("popup__opened");
    }
    setEventListener(){
        this.popupCloseButton.addEventListener("click", ()=>{
            this.close();
        });
        this.popupSelector.addEventListener("click", ()=>{
            if(this._isClickOutside){
                this.close();
            }
            
        });

    }
}