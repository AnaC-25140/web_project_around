import  FormValidator  from "./FormValidator.js";
import Card from "./Card.js";
import {initialCards, templateCard, cardArea, addFormElement,formElement} from "./Util.js";
import { Section } from "./Section.js";

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


const sectionCards= new Section({
  items: initialCards,
  renderer: function(element){
    const cardCreated = new Card (element.name, element.link, templateCard);
    sectionCards.addItem(cardCreated.generateCard());
  }//la logica de agregar cartas
}, ".elements__container-top");
sectionCards.renderer();