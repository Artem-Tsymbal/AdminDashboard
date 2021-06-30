import './index.scss';

export const Item = ({ user, updateAccountStatus }) => (
  <div className="item">
    <div className="item__actions">
      {user.isActive ? (
        <div className="item__diactivateButton">
          <button onClick={() => updateAccountStatus(user._id)} type="button">
            Diactivate
          </button>
        </div>
      ) : (
        <div className="item__activateButton">
          <button onClick={() => updateAccountStatus(user._id)} type="button">
            Activate
          </button>
        </div>
      )}
    </div>

    <div className="item__email">{user.email}</div>
    <div className="item__isActiveStatus">{user.isActive.toString()}</div>
  </div>
);
