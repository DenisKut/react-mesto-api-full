import React, {useState, useContext, useEffect} from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";
import useFormValidation from "../hooks/useFormValidation";

export default function EditProfilePopup({isOpen, onClose, onUpdateUser, useEscapeBtnPress}) {
  const currentUser = useContext(CurrentUserContext);
  const {values, handleChangeValues, resetForm, errors, isValid} = useFormValidation();

  useEffect(() => {
    if(currentUser) {
      resetForm(currentUser, {}, true);
    }
  }, [resetForm, currentUser, isOpen]);

  function handleSubmit(event) {
    // Запрещаем браузеру переходить по адресу формы
    event.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser(values);
  }

  return(
    <PopupWithForm
      name="edit"
      title="Редактировать профиль"
      btnText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      useEscapeBtnPress={useEscapeBtnPress}
      btnActivity={!isValid}
    >
      <input
        id="name"
        name="ProfileName"
        className="popup__input popup__input_section_name"
        placeholder="Введите имя"
        minLength="2"
        maxLength="40"
        required
        value={values.name || ''}
        onChange={handleChangeValues}
      />
      <span className="popup__input-error profile-name-error">
        {errors.name || ''}
      </span>
      <input
        id="about"
        name="ProfileProfession"
        className="popup__input popup__input_section_profession"
        placeholder="Введите профессию"
        minLength="2"
        maxLength="200"
        required
        value={values.about || ''}
        onChange={handleChangeValues}
      />
      <span className="popup__input-error profile-profession-error">
        {errors.about || ''}
      </span>
    </PopupWithForm>
  );
}
