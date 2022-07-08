import { fetchUsers, selectAllUsers } from './usersSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
const UsersList = () => {
  const dispatch = useDispatch();
  const users = useSelector(selectAllUsers);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);
  console.log(users);
  return (
    <>
      <ul>
        {users.map((user) => (
          <li key={user.email}>{user.name}</li>
        ))}
      </ul>
    </>
  );
};
export default UsersList;
