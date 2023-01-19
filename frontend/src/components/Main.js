import React, {useContext} from "react";
import Card from "./Card.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

export default function Main({onEditProfile, onAddPlace, onEditAvatar, handleCardClick, cards, onCardLike, onCardDelete}) {
  const currentUser = useContext(CurrentUserContext);

  return(
    <main className="content">
      <section className="profile">
        <div className="profile__information">
          <div
            className="profile__avatar"
            style={{ backgroundImage: `url(${currentUser.avatar})` }}
            onClick={onEditAvatar}
          ></div>
          <h1 className="profile__title">{currentUser.name}</h1>
          <p className="profile__subtitle">{currentUser.about}</p>
          <button
            className="profile__edit-button"
            aria-label="Edit"
            type="button"
            onClick={onEditProfile}
          ></button>
        </div>
        <button
          className="profile__add-btn"
          aria-label="AddCard"
          type="button"
          onClick={onAddPlace}
        ></button>
      </section>
      <section className="elements">
        {
          cards.map((item) => (
            <Card
              key={item._id}
              cardData={item}
              onCardClick={handleCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))
        }
      </section>
    </main>
  )
}
