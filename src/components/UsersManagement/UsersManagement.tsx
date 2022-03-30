import { Route, Switch } from 'react-router-dom';
import List from './components/List/List';
import useItemsProvider from './useItemsProvider';
import ErrorBlock from '../ErrorBlock';
import Filter from './components/Filter/Filter';
import LoadingScreen from '../LoadingScreen';
import Header from './components/Header/Header';
import { Routes } from '~/constants';
import itemHasReusedPassword from '~/utils/itemHasReusedPassword';
import { useUserContext } from '../UserContext';
import { IItem } from '~/services/getUserItems';

const UsersManagement = () => {
  const {
    errorMessage: userProviderErrorMessage,
    isLoading: userDataIsLoading,
    username,
  } = useUserContext();

  const {
    items, isLoading, errorMessage, setItems,
  } = useItemsProvider();

  const getItems = (type: 'old' | 'wrong' | 'reused'): Array<IItem> => {
    switch (type) {
      case 'old': {
        return items.filter((item) => {
          const time = new Date(item.createdAt);
          const now = new Date();

          const thirtyDays = 30 * 24 * 60 * 60 * 1000;

          const diffTime = now.getTime() - time.getTime();

          return diffTime > thirtyDays;
        });
      }
      case 'wrong': {
        const pattern = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
        const emailRegExp = new RegExp(pattern);

        return items.filter((item) => !item.email.match(emailRegExp));
      }
      default: {
        return items.filter((item) => itemHasReusedPassword(item, items));
      }
    }
  };

  if (isLoading || userDataIsLoading) {
    return <LoadingScreen />;
  }

  if (userProviderErrorMessage || errorMessage) {
    return <ErrorBlock error={userProviderErrorMessage || errorMessage} />;
  }

  return (
    <div className="container">
      <Header items={getItems('wrong')} username={username} />
      <Filter items={items} getItems={getItems} />
      <Switch>
        <Route exact path={Routes.Users}>
          <List items={items} setItems={setItems} />
        </Route>
        <Route path={Routes.Weak}>
          <List items={getItems('wrong')} setItems={setItems} />
        </Route>
        <Route path={Routes.Reused}>
          <List items={getItems('reused')} setItems={setItems} />
        </Route>
        <Route path={Routes.Old}>
          <List items={getItems('old')} setItems={setItems} />
        </Route>
      </Switch>
    </div>
  );
};

export default UsersManagement;
