export default class Api {
    constructor(mainUrl, headers) {
      this._mainUrl = mainUrl;
      this._headers = headers;
    }
  
    // Verificar la respuesta del servidor
    _checkResponse(res) {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    }
  
    // Información del usuario
    getUserInfo() {
      return fetch(`${this._mainUrl}/users/me`, {
        method: "GET",
        headers: this._headers,
      }).then(this._checkResponse);
    }
    //obtener las cartas
    getCards() {
      return fetch(`${this._mainUrl}/cards/`, {
        method: "GET",
        headers: this._headers,
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error(`Error: ${res.status}`);
          }
          return res.json();
        });
    }
    updateProfile(name,about){
      return fetch(`${this._mainUrl}/users/me`, {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({
          name: name,
          about: about
        }),
      })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Error al actualizar los datos: ${res.status}`);
        }
        return res.json();
      });
    }
    addCard(name, link) {
      return fetch(`${this._mainUrl}/cards/`, {
        method: "POST", 
        headers: this._headers,
        body: JSON.stringify({
          name: name, 
          link: link,
        }),
      })
        .then(this._checkResponse)
        .catch((err) => {
          console.error(`Error al crear la carta: ${err}`);
          throw err;
        });
    }
    toggleLikeCard(cardId, isLiked) {
      const method = isLiked ? 'PUT' : 'DELETE'; // PUT si es un "like", DELETE si es un "unlike"
      return fetch(`${this._mainUrl}/cards/likes/${cardId}`, {
        method: method,
        headers: this._headers
      })
      .then(this._checkResponse)
      .catch((err) => {
        console.error("Error al actualizar el estado del like:", err);
      });
    }
    deleteCard(cardId) {
      return fetch(`${this._mainUrl}/cards/${cardId}`, {
        method: "DELETE", // Usamos DELETE para eliminar la tarjeta
        headers: this._headers,
      })
        .then(this._checkResponse)
        .catch((err) => {
          console.error(`Error al eliminar la tarjeta: ${err}`);
          throw err;
        });
    }
    updateAvatar(avatarUrl) {
      return fetch(`${this._mainUrl}/users/me/avatar`, {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({ avatar: avatarUrl }),
      }).then((res) => {
        if (!res.ok) {
          return Promise.reject(`Error: ${res.status}`);
        }
        return res.json();
      });
    }
  }



