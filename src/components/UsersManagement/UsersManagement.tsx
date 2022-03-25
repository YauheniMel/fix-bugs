import List from './components/List/List';
import useItemsProvider from './useItemsProvider';
import ErrorBlock from '../ErrorBlock';
import Filter from './components/Filter/Filter';
import LoadingScreen from '../LoadingScreen';
import Header from './components/Header/Header';
import {Route, Switch} from "react-router-dom";
import {Routes} from '~/constants';
import itemHasWeakPassword from "~/utils/itemHasWeakPassword"; // this is not used
import itemHasReusedPassword from "~/utils/itemHasReusedPassword";
import { useUserContext } from '../UserContext';

const UsersManagement = () => {
  const {
    errorMessage: userProviderErrorMessage,
    isLoading: userDataIsLoading,
    username,
  } = useUserContext();

  let {
    items,
    isLoading,
    errorMessage,
    setItems
  } = useItemsProvider();

  if (isLoading || userDataIsLoading) {
    return <LoadingScreen/>
  }

  if (userProviderErrorMessage || errorMessage) {
    return <ErrorBlock error={userProviderErrorMessage || errorMessage}/>
  }

  return (
    <div className="container">
      <Header items={items} username={username} />
      <Filter items={items}/>
      <Switch>
        <Route exact path={Routes.Users}>
          <List items={items} setItems={setItems}/>
        </Route>
        <Route path={Routes.Weak}>
          <List
            items={items.filter((item) => !item.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/))}
            setItems={setItems}
          />
        </Route>
        <Route path={Routes.Reused}>
          <List
            items={items.filter((item) => itemHasReusedPassword(item, items))}
            setItems={setItems}
          />
        </Route>
      </Switch>
    </div>
  );
};

export default UsersManagement;
