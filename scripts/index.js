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
const addPopupButton= document.querySelector(".profile__add");// boton pop up imagenes
const addPopupElement= document.querySelector("#addImage");
const addSaveButton=document.querySelector("#addSave");
const addCloseButton= addPopupElement.querySelector("#addCloseButton");
const templateCard=document.querySelector(".template");
const cardArea= document.querySelector(".elements__container-top");
const inputCardTitle=document.querySelector("#addTitle");
const inputCardUrl=document.querySelector("#addLink");
const addFormElement= document.querySelector("#addForm");
const popupImage=document.querySelector("#popup__image");
const popupImageCloseButton=document.querySelector(".popup__image-close-button");
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
function pressEnter(avoidEnter){
  if (avoidEnter.keyCode == 13){
    avoidEnter.preventDefault();
  }
}
function pressEsc(esc){
  if (esc.keyCode === 27){
    closeEditPopup();
    closeAddPopup();
  }
}
function handleOpenEditPopup(){
  editPopupElement.classList.add("popup__opened"); //mandamos a llamar nuestra seccion de popup
  nameInput.value = profileNameElement.textContent; //le damos valor inicial a esos form que digan los nombres actuales
  aboutInput.value = profileAboutElement.textContent;
  document.addEventListener("keypress", pressEnter);
  document.addEventListener("keydown", pressEsc);
}
function closeEditPopup(){
  editPopupElement.classList.remove("popup__opened");
  document.removeEventListener("keypress", pressEnter);
  document.removeEventListener("keydown", pressEsc);
}
function handleSaveInformation(event){
  event.preventDefault();
  profileNameElement.textContent= nameInput.value;
  profileAboutElement.textContent= aboutInput.value;
  document.removeEventListener("keypress", pressEnter);
  closeEditPopup();
}
// aqui empiezan el de las imgs
function handleOpenAddPopup(){
  addPopupElement.classList.add("popup__opened");
  document.addEventListener("keypress", pressEnter);
  document.addEventListener("keydown", pressEsc);
}
function closeAddPopup(){
  addPopupElement.classList.remove("popup__opened");
  document.removeEventListener("keypress", pressEnter);
  document.removeEventListener("keydown", pressEsc);
}
function generateCard(title,link){
  const card = templateCard.cloneNode(true).content.querySelector(".elements__place");
  const cardImage= card.querySelector(".elements__place-picture");
  const cardTitle = card.querySelector(".elements__box-name");
  const likeButton=card.querySelector(".elements__box-heart"); //para el me gusta
  const deleteButton=card.querySelector(".elements__place-delate");
  cardImage.src=link;
  cardTitle.textContent=title;
  cardImage.alt=title;
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
  const newCard = generateCard(element.name, element.link);
  cardArea.append(newCard);
})
function handleAddSubmit(event){
  event.preventDefault();
  const newCard = generateCard (inputCardTitle.value, inputCardUrl.value);
  cardArea.prepend(newCard); //prepend es para que agregue al inicio, si lo quito pone la card al final
  document.removeEventListener("keypress", pressEnter);
  closeAddPopup();
  resetImage();
}
function resetImage(){
  addFormElement.reset();
}
//abrir y cerrar imagen
function handleOpenImage(title,link){
  popupOpenedImage.src=link;
  popupOpenedImage.alt=title;
  popupTitle.textContent=title;
  popupImage.classList.add("popup__opened");
}
function handleCloseImage(){
  popupImage.classList.remove("popup__opened");
}
//aqui cerramos al hacer click fuera del formulario
//target es para saber donde a ocurrido ese evento y matches es para donde
document.addEventListener("click", (e)=>{
  if (e.target.matches(".popup__container")){
    closeEditPopup();
    closeAddPopup();
    handleCloseImage();
  }
  });
editProfileButton.addEventListener("click",handleOpenEditPopup);
closeButton.addEventListener("click",closeEditPopup);
saveButton.addEventListener("click",handleSaveInformation);


addPopupButton.addEventListener("click",handleOpenAddPopup);
addCloseButton.addEventListener("click",closeAddPopup);
addFormElement.addEventListener("submit",handleAddSubmit);

popupImageCloseButton.addEventListener("click",handleCloseImage);
document.removeEventListener("keydown", pressEsc);


