import Popup from "./Popup.js";
// solo que abran las imagenes
export default class PopupWithImage extends Popup{
    constructor(popupSelector){
        super(popupSelector); //aqui decimos que es la del padre 
        this.popupCloseButton = this.popupElement.querySelector('.popup__image-close-button');
    }
    open(title, link){
    super.open(); //vamos a modificar la del padre
    const popupImage=document.querySelector("#popup__image");
    //const popupImageCloseButton=document.querySelector(".popup__image-close-button");
    const popupTitle=document.querySelector(".popup__title");
    const popupOpenedImage=document.querySelector(".popup__image-open");
    
        popupOpenedImage.src=link;
        popupOpenedImage.alt=title;
        popupTitle.textContent=title;
        
    }
    close() {
        super.close();
        
      }

}

// import {popupImage, popupOpenedImage, popupTitle} from "./Util.js"
// export default class Card{
//      constructor(title,link,template){
//         this.title=title;
//         this.link=link;
//         this.template=template;
//     }

//      _handleOpenImageCard(){
//        popupOpenedImage.src=this.link;
//        popupOpenedImage.alt=this.title;
//        popupTitle.textContent=this.title;
//       popupImage.classList.add("popup__opened");
//     }
    
//     _setEventListeners(){
//        this.cardImage.addEventListener("click" , ()=>{
//          this._handleOpenImageCard();
//        } );
//     }
// }