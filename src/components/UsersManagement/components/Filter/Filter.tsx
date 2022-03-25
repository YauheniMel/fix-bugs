import { FC } from 'react';
import { Routes } from "~/constants";
import { IItem } from "~/services/getUserItems";
import FilterTab from "./components/FilterTab"

import './filter-style.scss';

interface IFilter {
  items: Array<IItem>;
}

const Filter: FC<IFilter> = ({items}) => {
  const itemsWrongEmails = items.filter((item) => {
    return !item.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
  });

  const reusedItemsCount = items.reduce((count, item) => (
    (count + 1)
  ), 0)

  return (
    <div className="filter">
      <FilterTab title="all" count={items.length} path={Routes.Users}/>
      <FilterTab title="Wrong" count={itemsWrongEmails.length} path={Routes.Weak}/>
      {/* there is wrong 'count' */}
      <FilterTab title="Reused" count={reusedItemsCount} path={Routes.Reused}/>
    </div>
  );
};

export default Filter;
