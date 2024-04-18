import {popupImage, popupOpenedImage, popupTitle} from "./Util.js"
export default class Card{
     constructor(title,link,template){
        this.title=title;
        this.link=link;
        this.template=template;
    }
    _getCardClone(){
        this.card=this.template.cloneNode(true).content.querySelector(".elements__place");//clona propiedades y todo
        this._setProperties();
        this.cardImage.src=this.link;
        this.cardTitle.textContent=this.title;
        this.cardImage.alt=this.title;
        return this.card;
    }
    _setProperties(){
      this.cardImage=this.card.querySelector(".elements__place-picture");
      this.cardTitle = this.card.querySelector(".elements__box-name");
      this.likeButton=this.card.querySelector(".elements__box-heart");
      this.deleteButton=this.card.querySelector(".elements__place-delate");
    }
    _handleLike(){
      this.handlelike= this.likeButton.classList.toggle("elements__box-heart-active");

    }
    _handleRemoveCard(){
      this._removeCard=this.card.remove();
    }
    _handleOpenImageCard(){
      popupOpenedImage.src=this.link;
      popupOpenedImage.alt=this.title;
      popupTitle.textContent=this.title;
      popupImage.classList.add("popup__opened");
    }
    
    _setEventListeners(){
      this.deleteButton.addEventListener("click", ()=>{
        this._handleRemoveCard();
      });
      this.cardImage.addEventListener("click" , ()=>{
        this._handleOpenImageCard();
      } );
      this.likeButton.addEventListener("click", ()=>{
        this._handleLike();
      });
      
    }
    generateCard(){
        this._getCardClone();
        this._setEventListeners();
        return this.card;
    }
}