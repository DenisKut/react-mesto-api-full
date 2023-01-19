import logo from "../images/Vector.svg";
import { Route, Switch, Link } from 'react-router-dom';

export default function Header ({email, onExit}) {
  return(
    <header className="header">
      <img className="header__logo" src={logo} alt="логотип MESTO RUSSIA"/>
      <Switch>
        <Route path='/sign-in'>
          <Link className='header__link' to='/sign-up'>Регистрация</Link>
        </Route>
        <Route path='/sign-up'>
          <Link className='header__link' to='/sign-in'>Войти</Link>
        </Route>
        <Route exact path='/'>
          <div className="header__info">
            <p className="header__email">{email}</p>
            <button className="header__exit-btn" onClick={onExit}>Выйти</button>
          </div>
        </Route>
      </Switch>
    </header>
  )
}
