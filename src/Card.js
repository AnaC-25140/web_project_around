import trashButtonIcon from "./images/Delate-button.png";
export default class Card{
  constructor(title, link, template, handleOpenImage, handleLike, cardId, isLiked,handleDeleteClick) {
    this.title = title;
    this.link = link;
    this.template = template;
    this.handleOpenImage = handleOpenImage;
    this.handleLike = handleLike;
    this.cardId = cardId;
    this.isLiked = isLiked; 
    this.handleDeleteClick=handleDeleteClick;
  }
    _getCardClone(){
        this.card=this.template.cloneNode(true).content.querySelector(".elements__place");//clona propiedades y todo
        this._setProperties();
        this.cardImage.src=this.link;
        this.cardTitle.textContent=this.title;
        this.cardImage.alt=this.title;
        if (this.isLiked) {
          this.likeButton.classList.add("elements__box-heart-active");
        } else {
          this.likeButton.classList.remove("elements__box-heart-active");
        }
        return this.card;
    }
    _setProperties(){
      this.cardImage=this.card.querySelector(".elements__place-picture");
      this.cardTitle = this.card.querySelector(".elements__box-name");
      this.likeButton=this.card.querySelector(".elements__box-heart");
      this.deleteButton=this.card.querySelector(".elements__place-delate");
      if (this.deleteButton) {
        this.deleteButton.src = trashButtonIcon;
    }
  }
    _handleOpenImageCard() {
      this.handleOpenImage(this.title, this.link);
  }
  _toggleLike() {
    const newLikeStatus = !this.isLiked; // Cambiar el estado local antes de enviar la solicitud
    this.handleLike(this.cardId, newLikeStatus)
      .then((updatedLikes) => {
        this.isLiked = newLikeStatus; // Actualiza el estado solo si la API responde correctamente
        this.likeButton.classList.toggle("elements__box-heart-active", this.isLiked);
        
        // Actualizar el contador de likes si la API devuelve el número de likes
        if (updatedLikes !== undefined) {
          const likeCounter = this.card.querySelector(".elements__box-like-counter");
          likeCounter.textContent = updatedLikes;
        }
      })
      .catch((err) => {
        console.error("Error al actualizar el estado de like:", err);
      });
  }

    _setEventListeners(){
        this.deleteButton.addEventListener("click", ()=> {
          console.log("Eliminando tarjeta con ID:", this.cardId); 
          this.handleDeleteClick(this.cardId,this.card)
          //this._handleRemoveCard();
        });
        this.cardImage.addEventListener("click" , ()=>{
          this._handleOpenImageCard();
        } );
        this.likeButton.addEventListener("click", () => {
          this._toggleLike();
        });
    }
    generateCard(){
        this._getCardClone();
        this._setEventListeners();
        return this.card;
    }
}