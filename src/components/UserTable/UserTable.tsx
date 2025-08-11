import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useQuery, keepPreviousData } from '@tanstack/react-query';

import Loader from '../Shared/Loader/Loader';
import ErrorInfo from '../Shared/ErrorInfo/ErrorInfo';

import { storeActions } from '../../store/users/users';

import type { User, UserResponse } from '../../models/user';
import type { UserState } from '../../models/store';

import { getUsers } from '../../utils/get-users';

import styles from './UserTable.module.css';
import CustomTable from '../Shared/CustomTable/CustomTable';

const UserTable: React.FC = () => {
  const users: User[] = useSelector((state: UserState) => state.users);

  const prevUsersValue = useRef<User[]>([]);
  const pageNumber = useRef(1);

  const dispatch = useDispatch();

  const { data, error, isLoading, isError, isFetching, refetch } = useQuery<UserResponse>({
    queryKey: ['users', pageNumber],
    queryFn: () => getUsers(pageNumber.current),
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (!data?.next) {
      return;
    }

    if (data?.users) {
      prevUsersValue.current = [...prevUsersValue.current, ...data.users];

      dispatch(storeActions.setUsers(prevUsersValue.current));
    }
  }, [data, dispatch]);

  const errorMessage = `${error?.name}: ${error?.message}`;
  const tableHeaderRows: { text: string; key: string }[] = [
    {
      text: 'ID',
      key: 'id',
    },
    {
      text: 'First Name',
      key: 'firstName',
    },
    {
      text: 'Last Name',
      key: 'lastName',
    },
    {
      text: 'Full Name',
      key: 'fullName',
    },
    {
      text: 'Email',
      key: 'email',
    },
    {
      text: 'City',
      key: 'city',
    },
    {
      text: 'DSR (Days Since Registered)',
      key: 'registeredDate',
    },
  ];

  return (
    <>
      {isLoading && <Loader />}

      {isError && <ErrorInfo message={errorMessage} />}

      {!!users.length && (
        <>
          <h1 className={styles.title}>User's Info</h1>
          <CustomTable
            data={users}
            isFetching={isFetching}
            refetch={refetch}
            setDatastoreAction={storeActions.setUsers}
            tableHeaderRows={tableHeaderRows}
            ascSortAction={storeActions.ascSortingUsersByProperty}
            descSortAction={storeActions.descSortinUsersByProperty}
            pageNumber={pageNumber}
          />
        </>
      )}
    </>
  );
};

export default UserTable;
