'use client';

import { useEffect, useState } from 'react';

export const ManagementUser = () => {
  const [users, setUsers] = useState<UserDto>();
  const [textFilter, setTextFilter] = useState<string>('');

  const loadUsers = async () => {
    try {
      // const response = await
    } catch (err) {
      console.log('ERR' + err);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleFilter = (event: any) => {
    setTextFilter(event.target.value);
  };

  return <div></div>;
};
