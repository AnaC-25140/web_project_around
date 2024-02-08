const profileElement= document.querySelector(".profile");
const profileNameElement= profileElement.querySelector(".profile__name");
const profileAboutElement= profileElement.querySelector(".profile__description");
const editProfileButton= document.querySelector(".profile__edit");//boton para popup
const editPopupElement= document.querySelector(".popup");//secc de popup
const formElement= document.querySelector(".popup__form");
const nameInput=formElement.querySelector(".popup__form-name");
const aboutInput=formElement.querySelector(".popup__form-about");
const saveButton=document.querySelector(".popup__form-save");
const closeProfileButton= editPopupElement.querySelector(".popup__close-button");
function openPopup(){
  editPopupElement.classList.add("popup__opened"); //mandamos a llamar nuestra seccion de popup
  nameInput.value = profileNameElement.textContent; //le damos valor inicial a esos form que digan los nombres actuales
  aboutInput.value = profileAboutElement.textContent;
}
function closePopup(){
  editPopupElement.classList.remove("popup__opened");
}
function saveInformation(event){
  event.preventDefault();
  profileNameElement.textContent= nameInput.value;
  profileAboutElement.textContent= aboutInput.value;
  closePopup();
}
editProfileButton.addEventListener("click",openPopup);
closeProfileButton.addEventListener("click",closePopup);
saveButton.addEventListener("click",saveInformation);

