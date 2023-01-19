import PopupWithForm from "./PopupWithForm";

export default function DeleteCardConfirmPopup({isOpen, onClose, isConfirm, useEscapeBtnPress}) {
  function handleCardDelete (event) {
    event.preventDefault();
    isConfirm();
  }

  return(
    <PopupWithForm
      name="deleteCardConfirm"
      title="Вы уверены?"
      btnText="Да"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleCardDelete}
      useEscapeBtnPress={useEscapeBtnPress}
    />
  )
}
