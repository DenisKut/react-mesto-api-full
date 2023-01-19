import React, {useEffect, useRef} from "react";
import PopupWithForm from "./PopupWithForm";
import useFormValidation from "../hooks/useFormValidation";

export default function EditAvatarPopup({isOpen, onClose, onUpdateAvatar, useEscapeBtnPress}) {
  const {values, handleChangeValues, resetForm, errors, isValid} = useFormValidation();

  useEffect(() => {
    resetForm();
  }, [resetForm, isOpen]);

  function handleSubmit(event) {
    event.preventDefault();
    onUpdateAvatar(values);
  }

  return (
    <PopupWithForm
      name="avatar-edit"
      title="Обновить аватар"
      btnText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      useEscapeBtnPress={useEscapeBtnPress}
      btnActivity={!isValid}
    >
      <input
        id="avatar"
        name="AvatarLink"
        className="popup__input popup__input_section_avatar"
        placeholder="Ссылка на картинку"
        type="url"
        value={values.avatar || ''}
        onChange={handleChangeValues}
        required
      />
      <span className="popup__input-error avatar-link-error">
        {errors.avatar || ''}
      </span>
    </PopupWithForm>
  )
}
