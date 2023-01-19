export default function PopupWithForm({name, title, children, btnText, isOpen, onClose, onSubmit, useEscapeBtnPress, btnActivity = false}) {
  useEscapeBtnPress(onClose, isOpen);
  return(
    <div
      className={`popup popup_${name} ${isOpen ? 'popup_opened' : ''}`}
      onClick={onClose}
    >
      <div className="popup__container"
          onClick={(event) => {event.stopPropagation()}}
      >
        <form
          className="popup__form"
          name={name}
          autoComplete="off"
          onSubmit={onSubmit}
          noValidate
        >
          <button
            className="popup__close-btn"
            onClick={onClose}
            aria-label="ClosePopup"
            type="button"
            title="Закрыть окно"
          ></button>
          <fieldset className="popup__field">
            <legend className="popup__heading">{title}</legend>
            <div className="popup__children">
              {children}
            </div>
            <button
              className={`popup__submit-btn ${btnActivity && 'popup__submit-btn_inactive'}`}
              aria-label="SavePopup"
              type="submit"
              disabled={btnActivity}
            >{btnText}</button>
          </fieldset>
        </form>
      </div>
    </div>
  )
}
