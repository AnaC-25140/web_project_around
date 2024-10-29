export default class FormValidator{
    constructor(formElement, settings){
        this.formElement=formElement;
        this.formSelector=settings.formSelector;
        this.inputSelector=settings.inputSelector;
        this.submitButtonSelector=settings.submitButtonSelector;
        this.inactiveButtonClass=settings.inactiveButtonClass;
        this.inputErrorClass=settings.inputErrorClass;
        this.errorClass=settings.errorClass;
        this.buttonElement=this.formElement.querySelector(settings.submitButtonSelector);
        this.inputList = Array.from(this.formElement.querySelectorAll(this.inputSelector));
    }
    _showInputError(inputElement, errorMessage){
        this.errorElement = this.formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this.inputErrorClass);
        this.errorElement.textContent = errorMessage;
        this.errorElement.classList.add(this.errorClass);
    }
    _hideInputError(inputElement){
        this.errorElement = this.formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this.inputErrorClass);
        this.errorElement.classList.remove(this.errorClass);
        this.errorElement.textContent = "";
    }
    _checkInputValidity(inputElement){
        if(!inputElement.validity.valid){
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    }
    _hasInvalidInput(){
        return this.inputList.some((inputElement) => {
            return !inputElement.validity.valid;
          });
    }
    _toggleButtonState(){
        if (this._hasInvalidInput()) {
            this.buttonElement.classList.add(this.inactiveButtonClass);
            this.buttonElement.disabled=true;
          } else {
            this.buttonElement.classList.remove(this.inactiveButtonClass);
            this.buttonElement.disabled=false;
          }
    }
    _setEventListeners(){
        this.inputList.forEach((element) => {
          element.addEventListener("input", () => 
          {
            this._checkInputValidity(element);
            this._toggleButtonState();
          });
        });
    }
    resetFormValidation(){
        this.formElement.reset();
        this.inputList.forEach((inputElement)=>{
            this._hideInputError(inputElement);
        })
        this._toggleButtonState();
    }
    enableValidation(){
            this.formElement.addEventListener("keydown", (evt)=>
            {
                console.log(evt.key)
                if(evt.key==="Enter"){
                    return false
                }
            })
        this._setEventListeners();
    }
    }