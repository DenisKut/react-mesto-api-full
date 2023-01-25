import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute.js';
import Header from "./Header.js";
import Main from "./Main.js";
import Login from './Login.js';
import Register from './Register.js';
import Footer from "./Footer.js";
import ImagePopup from "./ImagePopup.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import DeleteCardConfirmPopup from "./DeleteCardConfirmPopup.js";
import InfoTooltip from "./InfoTooltip.js";
import Loader from "./Loader.js";
import React, {useState, useEffect} from "react";
import api from "../utils/Api.js";
import authentification from '../utils/Authentification.js';
import {CurrentUserContext} from "../contexts/CurrentUserContext.js";

export default function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isDeleteCardConfirmPopupOpen, setIsDeleteCardConfirmPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState({isOpen:false, confirmed: false})

  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    // Отправляем запрос в api и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => c._id === card._id ? newCard : c)
        );
      })
      .catch(error => console.log(error));
  }

  function handleCardDeleteClick(card){
    setSelectedCard(card);
    setIsDeleteCardConfirmPopupOpen(true);
  }

  function handleCardDelete() {
    setIsLoading(true);
    api.deleteCard(selectedCard)
      .then(() => {
        setCards((state) =>
          state.filter((c) => c._id !== selectedCard._id)
        );
        closeAllPopups();
      })
      .catch(error => console.log(error))
      .finally(() => setIsLoading(false));
  }

  function handleAddPlaceSubmit(card) {
    setIsLoading(true);
    api.addCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(error => console.log(error))
      .finally(() => setIsLoading(false));
  }

  function handleUpdateUser(info) {
    setIsLoading(true);
    api.setUserInfo(info)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch(error => console.log(error))
      .finally(() => setIsLoading(false));
  }

  function handleUpdateAvatar(data) {
    setIsLoading(true);
    api.setAvatar(data)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch(error => console.log(error))
      .finally(() => setIsLoading(false));
  }

  function handleInfoTooltip(res) {
    setIsInfoTooltipOpen({isOpen: true, confirmed: res});
  }

  function handleLogin({email, password}) {
    setIsLoading(true);
    authentification.login(email, password)
      .then(jwt => {
        if(jwt.token) {
          setLoggedIn(true);
          setEmail(email);
          localStorage.setItem('jwt', jwt.token);
          history.push('/')
        }
      })
      .catch(error => {
        handleInfoTooltip(false);
        console.log(error);
      })
      .finally(() => setIsLoading(false))
  }

  function handleRegister({ email, password }) {
    setIsLoading(true);
    authentification.register(email, password)
      .then(data => {
        if (data) {
          handleInfoTooltip(true);
          history.push('/sign-in');
        }
      })
      .catch(error => {
        console.log(error);
        handleInfoTooltip(false);
      })
      .finally(() => setIsLoading(false))
  }

  function handleSignOut() {
    localStorage.removeItem('jwt');
    setEmail('');
    setLoggedIn(false);
    history.push('/sign-in');
  }

  function useEscapePress(callback, dependency) {
    useEffect(() => {
      if (dependency) {
        const onEscClose = event => {
          if (event.key === 'Escape') {
            callback();
          }
        }
        document.addEventListener('keyup', onEscClose);
        return () => {
          document.removeEventListener('keyup', onEscClose)
        };
      }
    }, [dependency])
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setIsDeleteCardConfirmPopupOpen(false);
    setIsInfoTooltipOpen({ isOpen: false, confirmed: false })
    setSelectedCard({});
  }

  useEffect(() => {
    if(loggedIn) {
      setIsLoading(true);
      api.getInitialData()
      .then(([cards, user]) => {
        setCards(cards)
        setCurrentUser(user);
      })
      .catch(error => console.log(error))
      .finally(() => setIsLoading(false));
    }
  }, [loggedIn]);

useEffect(() => {
  const jwt = localStorage.getItem('jwt');
  if (jwt) {
    authentification.checkToken(jwt)
      .then(data => {
        if(data) {
          setEmail(data.email);
          setLoggedIn(true);
          history.push('/');
        }
      })
      .catch(error => console.log(error));
  }
}, [history])

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header email={email} onExit={handleSignOut}/>
        {/* С версии реакт 6 нужно использовать Routes вместо Switch и Navigate вместо Redirect */}
        <Switch>
        <ProtectedRoute exact path='/'
            component={Main}
            className="content"
            loggedIn={loggedIn}
            cards={cards}
            onEditProfile={handleEditProfileClick}
            onEditAvatar={handleEditAvatarClick}
            onAddPlace={handleAddPlaceClick}
            handleCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDeleteClick}
          />
          <Route path='/sign-in'>
            <Login onLogin={handleLogin}/>
          </Route>
          <Route path='/sign-up'>
            <Register handleRegistration={handleRegister}/>
          </Route>
          {/* <Route>
            {loggedIn ? (
              <Redirect to='/' />
            ) : (
              <Redirect to='/sign-in' />
            )}
          </Route> */}
        </Switch>

        <Footer/>

        <Loader
          isOpen={isLoading}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          useEscapeBtnPress={useEscapePress}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          useEscapeBtnPress={useEscapePress}
        />

        <ImagePopup
          selectedCard={selectedCard}
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
          useEscapeBtnPress={useEscapePress}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          useEscapeBtnPress={useEscapePress}
        />

        <DeleteCardConfirmPopup
          isOpen={isDeleteCardConfirmPopupOpen}
          onClose={closeAllPopups}
          isConfirm={handleCardDelete}
          useEscapeBtnPress={useEscapePress}
        />

        <InfoTooltip
          activity={isInfoTooltipOpen}
          onClose={closeAllPopups}
          useEscapeBtnPress={useEscapePress}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}
