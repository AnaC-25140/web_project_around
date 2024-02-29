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
const addFormElement= document.querySelector("#addForm"); //los edit son para nombre y acerca de
const titleInput=addFormElement.querySelector("#addTitle");
const linkInput=addFormElement.querySelector("#addLink");
const addSaveButton=document.querySelector("#addSave");
const addCloseButton= addPopupElement.querySelector("#addCloseButton");

function handleOpenEditPopup(){
  editPopupElement.classList.add("popup__opened"); //mandamos a llamar nuestra seccion de popup
  nameInput.value = profileNameElement.textContent; //le damos valor inicial a esos form que digan los nombres actuales
  aboutInput.value = profileAboutElement.textContent;
}
function closeEditPopup(){
  editPopupElement.classList.remove("popup__opened");
}
// aqui empiezan el de las imgs
function handleOpenAddPopup(){
  addPopupElement.classList.add("popup__opened");
}
function closeAddPopup(){
  addPopupElement.classList.remove("popup__opened");
}

function saveInformation(event){
  event.preventDefault();
  profileNameElement.textContent= nameInput.value;
  profileAboutElement.textContent= aboutInput.value;
  closeEditPopup();
}
editProfileButton.addEventListener("click",handleOpenEditPopup);
closeButton.addEventListener("click",closeEditPopup);
saveButton.addEventListener("click",saveInformation);

addPopupButton.addEventListener("click",handleOpenAddPopup);
addCloseButton.addEventListener("click",closeAddPopup);
