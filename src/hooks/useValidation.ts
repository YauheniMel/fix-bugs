import { useEffect, useState } from 'react';

const useValidation = (
  type: 'username' | 'password',
  value: string,
  minLength: number,
  maxLength: number
) => {
  const [alert, setAlert] = useState<String>(null);
  const [touched, setTouched] = useState(false);

  const getAlertContent = (str: string): null | string => {
    if (touched && str.length < minLength) {
      return `Minimum ${type} length ${minLength} letters`;
    }
    if (touched && str.length > maxLength) {
      return `Maximum ${type} length ${maxLength} letters`;
    }

    return null;
  };

  useEffect(() => {
    setAlert(getAlertContent(value));
  }, [value, touched]);

  return {
    alert,
    touched,
    setTouched,
  };
};

export default useValidation;
