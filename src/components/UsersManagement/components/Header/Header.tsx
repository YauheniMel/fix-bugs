import {FC, useState} from 'react';
import { useHistory } from 'react-router-dom';
import ErrorBlock from '~/components/ErrorBlock';
import { Routes } from '~/constants';
import {IItem} from "~/services/getUserItems";
import logout from '../../../../services/logout';

import './header-style.scss';

interface IHeader {
  items: Array<IItem>;
  username: string;
}

const Header: FC<IHeader> = ({items, username}) => {
  const {push} = useHistory();
  const [errorMessage, setErrorMessage] = useState<string>();

  const handleLogout = async() => {
    setErrorMessage(null);

    try {
      await logout();
      push(Routes.Login);
    } catch (error) {
      setErrorMessage(error.messages);
    }
  }

  return (
    <div className="header">
      <div className="user-section">
        <button onClick={handleLogout}>{`Logout ${username}`}</button>
        { errorMessage && <p>Error</p>}
      </div>
      {/* too much h1 */}
      <h1>{`${items.length} Emails are wrong`}</h1>
      <span>Email validator to protect your company from bad registrations</span>
    </div>
  )
};

export default Header;
