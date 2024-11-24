import "./styles/index.css"
import header from "./images/Header.png" ;
import profilePicture from "./images/Profile.jpg";
import profileEdit from "./images/Edit_button.png";
import profileAdd from "./images/Add.png";
import editClose from "./images/Close-Icon.png";
import closeForm from "./images/Close-Icon.png";
import closeDelete from "./images/Close-Icon.png";
import addCloseButtonImg from "./images/Close-Icon.png";
import addCloseButtonPicture from "./images/Close-Icon.png";
import vectorImg from "./images/vector.png";
import  FormValidator  from "./FormValidator.js";
import Card from "./Card.js";
import UserInfo from "./UserInfo.js";
import {templateCard, addFormElement,formElement,nameInput,aboutInput,profileAvatar} from "./Util.js";
import { Section } from "./Section.js";
import  PopupWithImage  from "./PopupWithImage.js";
import { PopupWithForm } from "./PopupWithForm.js";
import Api from "./Api.js";
import PopupWithConfirmation from "./PopupWithConfirmation.js";
document.addEventListener("DOMContentLoaded", () => {
  const headerImg = document.getElementById("header");
  if (headerImg) headerImg.src = header;

  const profilePictureImg = document.getElementById("profileImage");
  if (profilePictureImg) profilePictureImg.src = profilePicture;

  const profileEditImg = document.getElementById("openModal");
  if (profileEditImg) profileEditImg.src = profileEdit;

  const profileAddImg = document.getElementById("profileEditImg");
  if (profileAddImg) profileAddImg.src = profileAdd;
  const addCloseButtonImage = document.getElementById("addCloseButton");
  if (addCloseButtonImage) addCloseButtonImage.src = addCloseButtonImg;

  const profileEditCloseImg = document.getElementById("editCloseButton");
  if (profileEditCloseImg) profileEditCloseImg.src = editClose;

  const closeFormImg = document.getElementById("formClose");
  if (closeFormImg) closeFormImg.src = closeForm;

  const deleteImageButton = document.getElementById("deleteCloseButton");
  if (deleteImageButton) deleteImageButton.src = closeDelete;

  const vectorImageIcon = document.getElementById("vectorProfile");
  if (vectorImageIcon) vectorImageIcon.src = vectorImg;

  const closeProfilePicture = document.getElementById("addCloseProfilePicture");
  if (closeProfilePicture) closeProfilePicture.src = addCloseButtonPicture;
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
 const popupEditProfile = new PopupWithForm('#editProfile', (values) => { //cambie esto para incorporar  api
  api.updateProfile(values.name, values.about)
.then((updateData) => {
  userInfo.setUserInfo({
    name: updateData.name,
    about: updateData.about
  });
})
  .catch((err) => {
    console.error("No se actualizo correctamente el perfil:", err);
  });
})
const openModalButtonProfile = document.querySelector(".profile__edit");
openModalButtonProfile.addEventListener("click", () => { 
  const currentUserInfo = userInfo.getUserInfo();
  validateProfileForm.resetFormValidation();
  nameInput.value = currentUserInfo.name;
  aboutInput.value = currentUserInfo.about;
  popupEditProfile.open();
});
//Aqui es para el popup de agregar tarjeta---------------------------------------------------------------------------------------------------------------------
const popupDeleteConfirmation = new PopupWithConfirmation('#deleteImage');
document.addEventListener('DOMContentLoaded', () => {
  popupDeleteConfirmation.setEventListeners();
});

const createCard = (item) => {
  return new Card(
    item.name,
    item.link,
    templateCard,
    (title, link) => popupWithImage.open(title, link),
    (cardId, isLiked) => {
      console.log(`Card ID: ${cardId}, Is Liked: ${isLiked}`);
    },
    item._id,
    item.isLiked,
    (cardId, cardElement) => {
      popupDeleteConfirmation.setSubmitAction(() => {
        api.deleteCard(cardId) // Eliminar la tarjeta de la API
          .then(() => {
            cardElement.remove(); // Eliminar del DOM
            popupDeleteConfirmation.close();
          })
          .catch((err) => console.error("Error al eliminar la tarjeta:", err));
      });
      popupDeleteConfirmation.open(); // Abre el modal de confirmación
    }
  );
};

const popupCards = new PopupWithForm('#addImage', (values) => {
  api.addCard(values.name, values.link)
    .then((nuevaCard) => {
      const card = createCard(nuevaCard);
      sectionCards.addItem(card.generateCard());
    })
    .catch((err) => console.error("Error al agregar tarjeta:", err));
});

const openModalButtonAdd = document.querySelector(".profile__add");
openModalButtonAdd.addEventListener("click", () => {
  validateAddForm.resetFormValidation();
  popupCards.open();
});
//Aqui va la de abrir imagen-------------------------------------------------------
const popupWithImage = new PopupWithImage('#popup__image'); 
const openImage = document.querySelector(".popup__image-open");
openImage.addEventListener("click", () => {
  openImage.open();
});
//Aqui va lo de la imagen del perfil-----------------------------------
const avatarForm = new PopupWithForm('#addProfilePicture', (formData) => {
  const avatarUrl = formData.link; // Obtén el enlace ingresado en el formulario

  api.updateAvatar(avatarUrl)
    .then((userData) => {
      // Actualiza el avatar en el DOM
      const profilePictureImg = document.getElementById("profileImage");
      profilePictureImg.src = userData.avatar;

      avatarForm.close(); // Cierra el modal si la actualización fue exitosa
    })
    .catch((err) => {
      console.error("Error al actualizar el avatar:", err);
      alert("No se pudo actualizar el avatar. Asegúrate de ingresar un enlace válido.");
    });
});
const openModalPicture = document.querySelector(".profile__picture-container");
openModalPicture.addEventListener("click", () => {
  validateAddForm.resetFormValidation(); // Resetea validaciones, si es necesario
  avatarForm.open();
});
//llamamos a la api
const api = new Api("https://around-api.es.tripleten-services.com/v1", {
  authorization: "bb92e92e-c72d-476e-8c84-fd7d16914439",
  "Content-Type": "application/json",
});
// Instanciamos la clase Section--------------------------------------------------------------------------------------------------------------------------------
const sectionCards = new Section({
  items: [], //inicialmente es un array vacío
  renderer: function(item) {
    const card = createCard(item); // Usa la función centralizada
    sectionCards.addItem(card.generateCard());
  }
}, ".elements__container-top");
sectionCards.renderer();
//Api--------------------------------------------------------------------------------------------------
 //----------------------------------Api para cargar las tarjetas
 api.getCards()
  .then((cards) => {
    cards.forEach((item) => {
      const card = createCard(item); // Usa la función centralizada
      sectionCards.addItem(card.generateCard());
    });
  });

api.getUserInfo()
  .then((data) => {
    // Asignar los datos a los elementos del DOM
    nameInput.textContent = data.name;
    aboutInput.textContent = data.about;
    profileAvatar.src = data.avatar;
    profileAvatar.alt = `Avatar de ${data.name}`;
    console.log("ID del usuario:", data._id); 
    console.log("Nombre:", data.name); 
    console.log("About:", data.about); 
    console.log("Avatar:", data.avatar);
  })
  .catch((err) => {
    console.error("Error al cargar la información del usuario:", err);
  });
 
  

 


  


