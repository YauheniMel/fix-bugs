import { SyntheticEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Routes } from '~/constants';
import login from '~/services/login';
import ErrorBlock from '../ErrorBlock';
import LoadingScreen from '../LoadingScreen';

import './login-style.scss';
import useValidation from './useValidation';

const Login = () => {
  const { push } = useHistory();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();

  const { alert: loginAlert, setTouched: setTouchedInputUsername } = useValidation('username', username, 5, 10);
  const { alert: passwordAlert, setTouched: setTouchedInputPassword } = useValidation('password', password, 5, 10);

  const handleSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);

    try {
      if (loginAlert || passwordAlert) {
        throw new Error('Invalid form');
      }

      await login(username, password);
      push(Routes.Users);
    } catch (error) {
      setErrorMessage(error.message);
    }

    setIsLoading(false);
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1 className="text-center">Mygom.tech</h1>
        <label>
          <input
            autoFocus
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            onBlur={() => setTouchedInputUsername(true)}
            placeholder="Username"
            type="text"
            className="input"
          />
          <p className="alert">
            <strong>{loginAlert}</strong>
          </p>
        </label>
        <label>
          <input
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            onBlur={() => setTouchedInputPassword(true)}
            placeholder="Password"
            type="password"
            className="input"
          />
          <p className="alert">
            <strong>{passwordAlert}</strong>
          </p>
        </label>
        <ErrorBlock error={errorMessage} />
        <button type="submit" className="button">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
