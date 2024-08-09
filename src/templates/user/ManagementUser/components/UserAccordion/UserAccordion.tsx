import { MyAccordion, Topic } from '@/components';
import { UserDto } from '@/dtos/user.dto';
import { EditUserModal } from './components';
import { removeUser } from '@/services/axios';
import { capitalize } from './components/EditUserModal/utils/capitalize';
import DeleteIcon from '@mui/icons-material/Delete';
import toast from 'react-hot-toast';

export const UserAccordion = ({
  user,
  loadUsers,
}: {
  user: UserDto;
  loadUsers: () => {};
}) => {
  const handleDelete = async (event: any) => {
    event.preventDefault();
    try {
      const confirm = window.confirm(
        `Você tem certeza que deseja apagar o usuário '${user.name}'?`,
      );

      if (confirm) {
        const response = await removeUser(user.idUser as string);
        if (response.error) return toast.error(response.message);

        toast.success(`Usuário '${user.name}' apagado com sucesso`);
        loadUsers();
      }
    } catch (err) {
      console.log('ERR: ' + err);
    }
  };
  console.log(user);

  return (
    <MyAccordion
      title={user.name}
      summaryStyle={{ backgroundColor: '#333', color: 'white' }}
      titleClassName="font-bold break-all"
      detailClassName="bg-gray-100"
      expandedIconStyle={{ color: 'white' }}
    >
      <Topic textBold="Nome: " textNormal={user.name} />
      <Topic textBold="CPF: " textNormal={user.cpf} />
      <Topic textBold="Telefone: " textNormal={user.phone} />
      <Topic textBold="E-mail: " textNormal={user.email} />
      <Topic textBold="Tipo: " textNormal={capitalize(user.type)} />

      <div className="flex mt-4">
        <EditUserModal user={user} loadUsers={loadUsers} />
        <button onClick={handleDelete}>
          <DeleteIcon color="error" />
        </button>
      </div>
    </MyAccordion>
  );
};
