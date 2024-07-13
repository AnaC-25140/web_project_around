import  FormValidator  from "./FormValidator.js";
import Card from "./Card.js";
import {initialCards, templateCard, cardArea, addFormElement,formElement} from "./Util.js";
import { Section } from "./Section.js";
import Popup from "./Popup.js";
import  PopupWithImage  from "./PopupWithImage.js";

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
const validateProfileForm= new FormValidator(formElement, settings);
validateProfileForm.enableValidation();

const validateAddForm= new FormValidator(addFormElement, settingsAdd);
validateAddForm.enableValidation();

//para la imagen
// const popupWithImage = new PopupWithImage("#popup-image");
// const openImage = document.querySelector(".popup__image-open");
// openImage.addEventListener("click", () => {opupWithImage.open();});

 //Aqui es para editar perfil
const handlerProfile= new Popup('#editProfile');
const openModalButtonProfile = document.querySelector(".profile__edit");
openModalButtonProfile.addEventListener("click", () => {handlerProfile.open();

  const nameInput=formElement.querySelector("#editName");
  const aboutInput=formElement.querySelector("#editAbout");
  const profileElement= document.querySelector(".profile");
  const profileNameElement= profileElement.querySelector(".profile__name");
  const profileAboutElement= profileElement.querySelector(".profile__description");
  nameInput.value = profileNameElement.textContent; //le damos valor inicial a esos form que digan los nombres actuales
  aboutInput.value = profileAboutElement.textContent;
});

//Aqui para agregar foto
const handlerAdd= new Popup('#addImage');
const openModalButtonAdd = document.querySelector(".profile__add");
openModalButtonAdd.addEventListener("click", () => {handlerAdd.open();
});

const sectionCards= new Section({
  items: initialCards,
  renderer: function(element){
    const cardCreated = new Card (element.name, element.link, templateCard);
    sectionCards.addItem(cardCreated.generateCard());
  }//la logica de agregar cartas
}, ".elements__container-top");
sectionCards.renderer();