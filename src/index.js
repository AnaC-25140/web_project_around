import "./styles/index.css"
import header from "./images/Header.png" ;
import profilePicture from "./images/Profile.jpg";
import profileEdit from "./images/Edit_button.png";
import profileAdd from "./images/Add.png";
import editClose from "./images/Close-Icon.png";
import closeForm from "./images/Close-Icon.png";
import closeFormImageSecond from "./images/Close-Icon.png";
import trashButton from "./images/Delate-button.png";
import  FormValidator  from "./FormValidator.js";
import Card from "./Card.js";
import UserInfo from "./UserInfo.js";
import {initialCards, templateCard, addFormElement,formElement,nameInput,aboutInput} from "./Util.js";
import { Section } from "./Section.js";
import  PopupWithImage  from "./PopupWithImage.js";
import { PopupWithForm } from "./PopupWithForm.js";
document.addEventListener("DOMContentLoaded", () => {
  const headerImg = document.getElementById("header");
  if (headerImg) headerImg.src = header;

  const profilePictureImg = document.getElementById("profileImage");
  if (profilePictureImg) profilePictureImg.src = profilePicture;

  const profileEditImg = document.getElementById("openModal");
  if (profileEditImg) profileEditImg.src = profileEdit;

  const profileAddImg = document.getElementById("profileEditImg");
  if (profileAddImg) profileAddImg.src = profileAdd;

  const profileEditCloseImg = document.getElementById("editCloseButton");
  if (profileEditCloseImg) profileEditCloseImg.src = editClose;

  const closeFormImg = document.getElementById("formClose");
  if (closeFormImg) closeFormImg.src = closeForm;

  const closeFormImage = document.getElementById("formClose");
  if (closeFormImage) closeFormImage.src = closeFormImageSecond;

  const trashButtonImg = document.getElementById("trashButton");
  if (trashButtonImg) trashButtonImg.src = trashButton;
});

//lo de aqui es para la validacion
const settings={
  formSelector: ".popup__form-profile",
    inputSelector: ".popup__input-profile",
    submitButtonSelector: ".popup__form-save-profile",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible"
}
const settingsAdd={
  formSelector: ".popup__form-add",
    inputSelector: ".popup__input-add",
    submitButtonSelector: ".popup__form-save-add",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible"
}
//Aqui va lo de la validacion----------------------------------------------------------------------------------------------
const validateProfileForm= new FormValidator(formElement, settings);
validateProfileForm.enableValidation();
const validateAddForm= new FormValidator(addFormElement, settingsAdd);
validateAddForm.enableValidation();
//Instanciamos userinfo
const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  aboutSelector: '.profile__description'
});
 //Aqui es para editar perfil----------------------------------------------------------------------------------------------
 const saveButton=document.querySelector("#editSave");
 const popupEditProfile = new PopupWithForm('#editProfile', (values) => {
  userInfo.setUserInfo({
    name: values.name,
    about: values.about
  });
})
const openModalButtonProfile = document.querySelector(".profile__edit");
openModalButtonProfile.addEventListener("click", () => { 
  const currentUserInfo = userInfo.getUserInfo();
  nameInput.value = currentUserInfo.name;
  aboutInput.value = currentUserInfo.about;
  popupEditProfile.open();
});
//Aqui es para el popup de agregar tarjeta---------------------------------------------------------------------------------------------------------------------
const popupCards = new PopupWithForm('#addImage', (values) => {
  // Utiliza el renderer de la instancia de Section para añadir una nueva tarjeta
  const cardCreated = new Card(values.name, values.link, templateCard);
  sectionCards.addItem(cardCreated.generateCard());
});
const openModalButtonAdd = document.querySelector(".profile__add");
openModalButtonAdd.addEventListener("click", () => {
  popupCards.open();
});
//Aqui va la de abrir imagen-------------------------------------------------------
const popupWithImage = new PopupWithImage('#popup__image'); 
const openImage = document.querySelector(".popup__image-open");
openImage.addEventListener("click", () => {
  openImage.open();
});
// Instanciamos la clase Section--------------------------------------------------------------------------------------------------------------------------------
const sectionCards = new Section({
  items: initialCards,
  renderer: function(item) {
      const cardCreated = new Card(item.name, item.link, templateCard,(title,link)=>
        {popupWithImage.open(title, link); });
      sectionCards.addItem(cardCreated.generateCard());
      //this.addItem(cardCreated.generateCard());
  }
}, ".elements__container-top");
// Renderiza las tarjetas iniciales
sectionCards.renderer();
