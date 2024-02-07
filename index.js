const profileElement= document.querySelector(".profile");
const profileNameElement= profileElement.querySelector(".profile__name");
const profileAboutElement= profileElement.querySelector(".profile__description");

const profileName=profileNameElement.textContent; //set o get text content
const profileAbout=profileAboutElement.textContent;//obtengo lo que hay en esas variables

const editProfileButton= document.querySelector(".profile__edit");//boton para popup
const editPopupElement= document.querySelector(".popup");//secc de popup

const formElement= document.querySelector(".popup__form");
const nameInput=formElement.querySelector(".popup__form-name");
const aboutInput=formElement.querySelector(".popup__form-about");
const saveButton=document.querySelector(".popup__form-save");

const closeProfileButton= editPopupElement.querySelector(".popup__close-button");


function openPopup(){
  editPopupElement.classList.add("popup__opened"); //mandamos a llamar nuestra seccion de popup
  nameInput.value = profileName; //le damos valor inicial a esos form que digan los nombres actuales
  aboutInput.value = profileAbout;
}
function closePopup(){
  editPopupElement.classList.add("popup__closed");
}
function saveInformation(event){
  event.preventDefault();
  profileName.textContent= nameInput.value;
  profileAbout.textContent= aboutInput.value;
  closePopup();
}

editProfileButton.addEventListener("click",openPopup);
closeProfileButton.addEventListener("click",closePopup);
saveButton.addEventListener("submit",saveInformation);

