import { useState, useCallback } from 'react';

export default function useFormValidation() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChangeValues = (event) => {
    const input = event.target;
    const { value, id } = input;
    setValues({ ...values, [id]: value }); // универсальный обработчик полей
    setErrors({ ...errors, [id]: input.validationMessage }); // ошибок
    setIsValid(input.closest('form').checkValidity()); // проверка валидности
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => { // это метод для сброса формы, полей, ошибок
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return { values, handleChangeValues, resetForm, errors, isValid };
}
