import { FC } from 'react';
import { Routes } from '~/constants';
import { IItem } from '~/services/getUserItems';
import FilterTab from './components/FilterTab';

import './filter-style.scss';

interface IFilter {
  items: Array<IItem>;
  getItems: (action: 'old' | 'wrong' | 'reused') => Array<IItem>;
}

const Filter: FC<IFilter> = ({ items, getItems }) => (
  <div className="filter">
    <FilterTab title="all" count={items.length} path={Routes.Users} />
    <FilterTab
      title="Wrong"
      count={getItems('wrong').length}
      path={Routes.Weak}
    />
    <FilterTab
      title="Reused"
      count={getItems('reused').length}
      path={Routes.Reused}
    />
    <FilterTab title="Old" count={getItems('old').length} path={Routes.Old} />
  </div>
);

export default Filter;
