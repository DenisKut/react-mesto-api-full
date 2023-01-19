import React, {useContext} from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Card({cardData, onCardClick, onCardLike, onCardDelete}) {
  const currentUser = useContext(CurrentUserContext);
  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = cardData.owner._id === currentUser._id;
  // Создаём переменную, которую после зададим в `className` для кнопки удаления
  const cardDeleteButtonClassName = (
    `element__delete-btn ${isOwn ? '' : 'element__delete-btn_hidden'}`
  );
  const isLiked = cardData.likes.some(item => item._id === currentUser._id);
  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = (
    `element__like ${isLiked ? 'element__like_enabled' : ''}`
    );

  function handleCardClick() {
    onCardClick(cardData);
  }

  function handleLikeClick() {
    onCardLike(cardData);
  }

  function handleDeleteClick() {
    onCardDelete(cardData);
  }

  return (
    <article className="element">
      <button
        className={cardDeleteButtonClassName}
        onClick={handleDeleteClick}
        aria-label="DeleteCard"
        type="button"
        title="Удалить карточку"
      ></button>
      <img
        className="element__image"
        onClick={handleCardClick}
        alt={cardData.name}
        title="Рассмотреть картинку"
        src={cardData.link}
      />
      <div className="element__caption">
        <h3 className="element__text">{cardData.name}</h3>
        <div className="element__like-section">
          <button
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
            aria-label="LikeCard"
            type="button"
          ></button>
          <p className="element__number-of-likes">{cardData.likes.length}</p>
        </div>
      </div>
    </article>
  )
}
