const profileElement= document.querySelector(".profile");
const profileNameElement= profileElement.querySelector(".profile__name");
const profileAboutElement= profileElement.querySelector(".profile__description");
const editProfileButton= document.querySelector(".profile__edit");//boton para popup nombre
const editPopupElement= document.querySelector("#editProfile");//secc de popup
const formElement= document.querySelector("#editForm"); //los edit son para nombre y acerca de
const nameInput=formElement.querySelector("#editName");
const aboutInput=formElement.querySelector("#editAbout");
const saveButton=document.querySelector("#editSave");
const closeButton= editPopupElement.querySelector("#editCloseButton");
const addPopupButton= document.querySelector(".profile__add-button");// boton pop up imagenes
const addPopupElement= document.querySelector("#addImage");
const addSaveButton=document.querySelector("#addSave");
const addCloseButton= addPopupElement.querySelector("#addCloseButton");
const templateCard=document.querySelector(".template");
const cardArea= document.querySelector(".elements__container-top");
const inputCardTitle=document.querySelector("#addTitle");
const inputCardUrl=document.querySelector("#addLink");
const addFormElement= document.querySelector("#addForm");
const popupImage=document.querySelector("#popup__image");
const popupImageCloseButton=document.querySelector(".popup__image__close-button");
const popupTitle=document.querySelector(".popup__title");
const popupOpenedImage=document.querySelector(".popup__image-open");
const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg"
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg"
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg"
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg"
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg"
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg"
  }
];

function handleOpenEditPopup(){
  editPopupElement.classList.add("popup__opened"); //mandamos a llamar nuestra seccion de popup
  nameInput.value = profileNameElement.textContent; //le damos valor inicial a esos form que digan los nombres actuales
  aboutInput.value = profileAboutElement.textContent;
}
function closeEditPopup(){
  editPopupElement.classList.remove("popup__opened");
}
function handleSaveInformation(event){
  event.preventDefault();
  profileNameElement.textContent= nameInput.value;
  profileAboutElement.textContent= aboutInput.value;
  closeEditPopup();
}
// aqui empiezan el de las imgs
function handleOpenAddPopup(){
  addPopupElement.classList.add("popup__opened");
}
function closeAddPopup(){
  addPopupElement.classList.remove("popup__opened");
}
function cardGenerator(title,link){
  const card = templateCard.cloneNode(true).content.querySelector(".elements__place");
  const cardImage= card.querySelector(".elements__place-picture");
  const cardTitle = card.querySelector(".elements__box-name");
  const likeButton=card.querySelector(".elements__box-heart"); //para el me gusta
  const deleteButton=card.querySelector(".elements__place-delate");
  cardImage.src=link;
  cardTitle.textContent=title;
  likeButton.addEventListener("click", function(){
    likeButton.classList.toggle("elements__box-heart-active"); //el toggle es para que si lo tiene lo quite y al reves
  });
  deleteButton.addEventListener("click", function(){
    card.remove();
  });
  cardImage.addEventListener("click" , function(){
    handleOpenImage(title,link);
  } );
  return card;
}
initialCards.forEach( function(element){
  const newCard = cardGenerator(element.name, element.link);
  cardArea.append(newCard);
})
function handleAddSubmit(event){
  event.preventDefault();
  const newCard = cardGenerator (inputCardTitle.value, inputCardUrl.value);
  cardArea.prepend(newCard); //prepend es para que agregue al inicio, si lo quito pone la card al final
  closeAddPopup();
}
//abrir y cerrar imagen
function handleOpenImage(title,link){
  popupOpenedImage.src=link;
  popupTitle.textContent=title;
  popupImage.classList.add("popup__opened");
}
function handleCloseImage(){
  popupImage.classList.remove("popup__opened");
}


editProfileButton.addEventListener("click",handleOpenEditPopup);
closeButton.addEventListener("click",closeEditPopup);
saveButton.addEventListener("click",handleSaveInformation);

addPopupButton.addEventListener("click",handleOpenAddPopup);
addCloseButton.addEventListener("click",closeAddPopup);
addFormElement.addEventListener("submit",handleAddSubmit);

popupImageCloseButton.addEventListener("click",handleCloseImage);
