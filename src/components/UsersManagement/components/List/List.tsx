import { FC, useState } from 'react';
import Modal from 'react-modal';
import getUserItems, { IItem } from '~/services/getUserItems';
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

export const UpdateModal: FC<IUpdateModal> = ({ item, setItems }) => {
  const [showModal, setShowModal] = useState(false);
  const [newEmail, setNewEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    await updateItem({
      ...item,
      email: newEmail,
    });

    const userItems = await getUserItems();

    setItems(userItems);

    setNewEmail('');
    setShowModal(false);
  };

  return (
    <>
      <button
        className="update"
        data-testid="button-update"
        onClick={() => setShowModal(true)}
      >
        Update Password
      </button>
      {showModal ? (
        <Modal
          className="modal"
          isOpen={showModal}
          ariaHideApp={false}
          onRequestClose={() => setShowModal(false)}
          contentLabel="Example Modal"
        >
          <h3>Update Password</h3>
          <form onSubmit={handleSubmit}>
            <input
              placeholder="new password"
              className="input"
              value={newEmail}
              onChange={(event) => setNewEmail(event.target.value)}
            />
            <div className="pt-12px text-center">
              <button>Change</button>
              <button
                className="button ml-12px"
                onClick={() => {
                  setShowModal(false);
                  setNewEmail('');
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </Modal>
      ) : null}
    </>
  );
};

const List: FC<IList> = ({ items, setItems }) => (
  <ul className="list">
    {items.map((item) => (
      <li data-testid="list-item" className="item" key={item.id}>
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
