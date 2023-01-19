import sucsessfulPicture from '../images/Sucsessful.svg';
import problematicPicture from '../images/Problematic.svg';

export default function InfoTooltip({
  activity: {isOpen, confirmed},
  onClose, useEscapeBtnPress
}) {
  useEscapeBtnPress(onClose, isOpen);

  return(
    <div
      className={`popup ${isOpen && 'popup_opened'}`}
      onClick={onClose}
    >
      <div className="popup__container"
          onClick={(event) => {event.stopPropagation()}}
      >
        <button
            className="popup__close-btn"
            onClick={onClose}
            aria-label="ClosePopup"
            type="button"
            title="Закрыть окно"
          ></button>
        <img
          className="popup__result-view"
          src={confirmed ? sucsessfulPicture : problematicPicture}
          alt="рисунок результата аутентификации"
        />
        <h2
          className='popup__subtitle'
        >
          {confirmed ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте еще раз."}
        </h2>
      </div>
    </div>
  );
}
