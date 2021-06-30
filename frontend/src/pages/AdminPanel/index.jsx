import { useEffect, useState } from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import { Item } from './Item';
import { useRootStore } from '../../contexts/RootStoreProvider';
import './index.scss';

export const AdminPanel = observer(() => {
  const { authStore, usersStore } = useRootStore();
  const [dataOfUsers, setDataOfUsers] = useState([]);
  const [dataOfCurrentUser, setDataOfCurrentUser] = useState({});

  useEffect(() => {
    setDataOfUsers(toJS(usersStore.usersData));
  }, [usersStore.usersData]);

  useEffect(() => {
    setDataOfCurrentUser(toJS(authStore.dataOfCurrentUser));
  }, [authStore.dataOfCurrentUser.isAdmin]);

  useEffect(() => {
    usersStore.fetchDataOfUsersRequest();
  }, []);

  const updateAdminStatus = () => {
    authStore.updateAdminStatusOfUser();
  };

  const updateAccountStatus = (userId) => {
    usersStore.updateAccountStatusOfUser(userId);
  };

  return (
    <div className="adminPanel">
      <div className="adminPanel__changeAdminStatusButton">
        <button onClick={updateAdminStatus} type="button">
          Change my admin status
        </button>
      </div>

      {dataOfCurrentUser.isAdmin ? (
        <div className="adminPanel__wrapper">
          {dataOfUsers.map((item) => (
            <Item
              key={item._id}
              user={item}
              updateAccountStatus={updateAccountStatus}
            />
          ))}
        </div>
      ) : (
        <div className="adminPanel__notification">You are not an admin</div>
      )}
    </div>
  );
});
