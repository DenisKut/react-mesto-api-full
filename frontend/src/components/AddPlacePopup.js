import React, {useEffect} from "react";
import PopupWithForm from "./PopupWithForm";
import useFormValidation from "../hooks/useFormValidation";

export default function AddPlacePopup({isOpen, onClose, onAddPlace, useEscapeBtnPress}) {
  const {values, handleChangeValues, resetForm, errors, isValid} = useFormValidation();

  useEffect(() => {
    resetForm();
  }, [resetForm, isOpen]);

  function handleSubmit(event) {
    event.preventDefault();
    onAddPlace(values);
  }

  return(
    <PopupWithForm
      name="add"
      title="Новое место"
      btnText="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      useEscapeBtnPress={useEscapeBtnPress}
      btnActivity={!isValid}
    >
      <input
        id="name"
        name="CardName"
        className="popup__input popup__input_section_name"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        type="text"
        value={values.name || ''}
        onChange={handleChangeValues}
        required
      />
      <span className="popup__input-error" >
        {errors.name || ''}
      </span>
      <input
        id="link"
        name="CardLink"
        className="popup__input popup__input_section_link"
        placeholder="Ссылка на картинку"
        type="url"
        required
        value={values.link || ''}
        onChange={handleChangeValues}
      />
      <span className="popup__input-error">
        {errors.link || ''}
      </span>
    </PopupWithForm>
  );
}
