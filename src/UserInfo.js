export default class UserInfo {
    constructor({ nameSelector, aboutSelector,avatarSelector }) {
        // Seleccionamos los elementos con los selectores pasados en el objeto del constructor
        this.nameElement = document.querySelector(nameSelector);
        this.aboutElement = document.querySelector(aboutSelector);
        this.avatarElement = document.querySelector(avatarSelector);
    }
    // Método para obtener la información del usuario desde el DOM
    getUserInfo() {
        return {
            name: this.nameElement.textContent,
            about: this.aboutElement.textContent,
            avatar: this.avatarElement ? this.avatarElement.src : null,
        };
    }
    // Método para establecer la nueva información del usuario en el DOM
    setUserInfo({ name, about, avatar }) {
        if (name) this.nameElement.textContent = name;
        if (about) this.aboutElement.textContent = about;
        if (avatar && this.avatarElement) this.avatarElement.src = avatar;
      }
}