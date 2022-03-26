import { FC, useState } from 'react';
import Modal from 'react-modal';
import getUserItems, { IItem, Roles } from '~/services/getUserItems';
import ItemIcon from './components/ItemIcon';
import updateItem from '../../../../services/updateItem';

import './list-style.scss';

interface IList {
  items: Array<IItem>;
  setItems: (items: Array<IItem>) => void;
}

interface IUpdateModal {
  item: IItem;
  setItems: (items: Array<IItem>) => void;
}

const UpdateModal: FC<IUpdateModal> = ({ item, setItems }) => {
  const [showModal, setShowModal] = useState(false);
  const [newEmail, setNewEmail] = useState('');

  return (
    <>
      <button className="update" onClick={() => setShowModal(true)}>
        Update Password
      </button>
      {showModal ? (
        <Modal
          className="modal"
          isOpen={showModal}
          appElement={document.getElementById('app')}
          onRequestClose={() => setShowModal(false)}
          contentLabel="Example Modal"
        >
          <h1>Update Password</h1>
          <input
            placeholder="new password"
            className="input"
            value={newEmail}
            onChange={(event) => setNewEmail(event.target.value)}
          />
          <div className="pt-12px text-center">
            <button
              className="button"
              onClick={async () => {
                await updateItem({
                  ...item,
                  email: newEmail,
                });

                const userItems = await getUserItems();

                setItems(userItems);

                setShowModal(false);
              }}
            >
              Change
            </button>
            <button
              className="button ml-12px"
              onClick={() => {
                setShowModal(false);
              }}
            >
              Cancel
            </button>
          </div>
        </Modal>
      ) : null}
    </>
  );
};

const List: FC<IList> = ({ items, setItems }) => (
  <ul className="list">
    {items.map((item) => (
      <li className="item" key={item.id}>
        <ItemIcon name={item.name} />
        <div>
          <div className="title">{item.name}</div>
          <div className="description">{item.email}</div>
        </div>
        <UpdateModal item={item} setItems={setItems} />
      </li>
    ))}
  </ul>
);

export default List;
