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
    this.isLiked = !this.isLiked;
    if (this.isLiked) {
      this.likeButton.classList.add("elements__box-heart-active");
    } else {
      this.likeButton.classList.remove("elements__box-heart-active");
    }
    this.handleLike(this.cardId, this.isLiked);
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
    handleDeleteClick(cardId, cardElement, popupDeleteConfirmation) {
      // Configura la acción para eliminar la tarjeta en el popup de confirmación
      popupDeleteConfirmation.setSubmitAction(() => {
        api.deleteCard(cardId) // Eliminar la tarjeta de la API
          .then(() => {
            cardElement.remove(); // Eliminarla del DOM
            popupDeleteConfirmation.close(); // Cierra el popup
          })
          .catch((err) => console.error("Error al eliminar la tarjeta:", err)); // Manejo de errores
      });
  
      // Abre el popup de confirmación
      popupDeleteConfirmation.open();
    }
    
}