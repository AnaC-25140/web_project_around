export default class UserInfo {
    constructor({ nameSelector, aboutSelector }) {
        // Seleccionamos los elementos con los selectores pasados en el objeto del constructor
        this.nameElement = document.querySelector(nameSelector);
        this.aboutElement = document.querySelector(aboutSelector);
    }
    // Método para obtener la información del usuario desde el DOM
    getUserInfo() {
        return {
            name: this.nameElement.textContent,
            about: this.aboutElement.textContent
        };
    }
    // Método para establecer la nueva información del usuario en el DOM
    setUserInfo({ name, about }) {
        this.nameElement.textContent = name;
        this.aboutElement.textContent = about;
    }
}