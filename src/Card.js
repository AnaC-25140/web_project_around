import trashButton from "./images/Delate-button.png";
export default class Card{
     constructor(title,link,template, handleOpenImage){ //y aqui el handle
        this.title=title;
        this.link=link;
        this.template=template;
        this.handleOpenImage= handleOpenImage; //agregue esta
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
      if (this.deleteButton) {
        this.deleteButton.src = trashButton;
     }
    }
    _handleLike(){
      this.handlelike= this.likeButton.classList.toggle("elements__box-heart-active");
    }
    _handleRemoveCard(){
      this._removeCard=this.card.remove();
    }
    _handleOpenImageCard() {
      //Llama a la función de abrir el popup
      this.handleOpenImage(this.title, this.link);
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