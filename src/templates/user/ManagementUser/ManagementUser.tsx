'use client';

import { formatUser, UserDto } from '@/dtos/user.dto';
import { findAllUsers } from '@/services/axios';
import { useEffect, useState } from 'react';
import { UserAccordion } from './components';
import toast from 'react-hot-toast';

export const ManagementUser = () => {
  const [users, setUsers] = useState<UserDto[]>();
  const [textFilter, setTextFilter] = useState<string>('');

  const loadUsers = async () => {
    try {
      const response: any = await findAllUsers();
      if (response['error']) return toast.error(response['message']);

      if (response) {
        const usersFormatted = [];
        for (const user of response) {
          usersFormatted.push(formatUser(user));
        }

        if (textFilter) {
          const textFilterLowerCase = textFilter.toLowerCase();
          const usersWithFilter = usersFormatted.filter((user: UserDto) => {
            if (user.name.toLowerCase().includes(textFilterLowerCase))
              return user;
            if (user.email.toLowerCase().includes(textFilterLowerCase))
              return user;
            if (user.cpf.toLocaleLowerCase().includes(textFilterLowerCase))
              return user;
            if (user.phone.toLocaleLowerCase().includes(textFilterLowerCase))
              return user;
          });
          setUsers(usersWithFilter);
        } else {
          setUsers(usersFormatted);
        }
      }
    } catch (err) {
      console.log('ERR' + err);
    }
  };

  useEffect(() => {
    loadUsers();
  }, [textFilter]);

  const handleFilter = (event: any) => {
    setTextFilter(event.target.value);
  };

  if (users) {
    return (
      <div className="flex flex-col justify-center items-center my-4 w-full">
        <h1 className="text-black font-bold text-xl mb-6">
          Gerenciamento de Usuários
        </h1>

        <div className="w-2/4">
          <input
            type="text"
            className="p-2 border-2 border-gray-800 w-full"
            placeholder="Buscar"
            onChange={handleFilter}
          />
        </div>
        {users.map((user: UserDto) => (
          <div className="w-3/4 md:2/4 mt-4" key={user.idUser}>
            <UserAccordion user={user} loadUsers={loadUsers} />
          </div>
        ))}
      </div>
    );
  }
  return <div></div>;
};
