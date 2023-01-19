import { useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import useFormValidation from '../hooks/useFormValidation';

function Register({handleRegistration}) {
  const {values, handleChangeValues, resetForm, errors, isValid} = useFormValidation();

  useEffect(() => {
    resetForm();
  }, [resetForm]);

  function handleSubmit(event) {
    event.preventDefault();
    handleRegistration(values);
  }

  return(
    <div className='login'>
      <h2 className='login__title'>Регистрация</h2>
      <form
        className='login__form'
        name='formLogin'
        noValidate
        onSubmit={handleSubmit}
      >
        <fieldset className="login__field">
          <input
            className='login__input'
            id='email'
            placeholder='Email'
            type="email"
            minLength="2"
            maxLength="40"
            required
            value={values.email || ''}
            onChange={handleChangeValues}
          />
          <span className="login__input-error">
            {errors.email || ''}
          </span>
          <input
            className='login__input'
            id="password"
            placeholder='Пароль'
            type='password'
            minLength="2"
            maxLength="40"
            required
            value={values.password || ''}
            onChange={handleChangeValues}
          />
          <span className="login__input-error">
            {errors.password || ''}
          </span>
        </fieldset>
        <button
          className={`login__button ${!isValid && 'login__button_inactive'}`}
          disabled={!isValid}
          type='submit'
        >
          Зарегистрироваться
        </button>
        <Link
          to="/sign-in"
          className='login__transition'
        >
          Уже зарегистрированы? Войти
        </Link>
      </form>
    </div>
  );
}

export default withRouter(Register);
