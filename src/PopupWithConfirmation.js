import Popup from './Popup.js';

class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this.submitAction = null; // Acción personalizada que se ejecuta al confirmar
  }

  setSubmitAction(action) {
    this.submitAction = action; // Permite configurar la acción a ejecutar
  }

  setEventListeners() {
    super.setEventListeners(); // Llama a los eventos base de la clase Popup
    if (!this.popupElement) {
      console.error("El popup no se encuentra en el DOM");
      return;
    }

    const deleteButton = this.popupElement.querySelector('.popup__form-save-delete');
    if (deleteButton) {
      deleteButton.addEventListener('click', (event) => {
        event.preventDefault();
        if (this.submitAction) {
          this.submitAction(); // Ejecuta la acción configurada
        }
      });
    } else {
      console.error("El botón de confirmación no se encuentra en el popup");
    }
  }
}

export default PopupWithConfirmation;