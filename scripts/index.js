import  FormValidator  from "./FormValidator.js";
import Card from "./Card.js";
import UserInfo from "./UserInfo.js";
import {initialCards, templateCard, addFormElement,formElement,nameInput,aboutInput} from "./Util.js";
import { Section } from "./Section.js";
import  PopupWithImage  from "./PopupWithImage.js";
import { PopupWithForm } from "./PopupWithForm.js";
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
