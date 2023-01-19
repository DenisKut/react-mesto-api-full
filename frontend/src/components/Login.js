import { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import useFormValidation from '../hooks/useFormValidation';

function Login({onLogin}) {
  const {values, handleChangeValues, resetForm, errors, isValid} = useFormValidation();

  useEffect(() => {
    resetForm();
  }, [resetForm]);

  function handleSubmit(event) {
    event.preventDefault();
    onLogin(values);
  }

  return(
    <div className='login'>
      <h2 className='login__title'>Вход</h2>
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
          Войти
        </button>
      </form>
    </div>
  );
}
export default withRouter(Login);
