import Popup from "./Popup.js";
// solo que abran las imagenes
export default class PopupWithImage extends Popup{
    constructor(popupSelector){
        super(popupSelector); //aqui decimos que es la del padre 
        this.setEventListeners();
    }
    open(title, link){
    super.open(); //vamos a modificar la del padre
        const popupOpenedImage = this.popupElement.querySelector('.popup__image-open');
        const popupTitle = this.popupElement.querySelector('.popup__title');
        popupOpenedImage.src=link;
        popupOpenedImage.alt=title;
        popupTitle.textContent=title;   
    }
    close() {
        super.close(); 
      }
}