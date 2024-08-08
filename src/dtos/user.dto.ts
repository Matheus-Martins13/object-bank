export interface UserDto {
  idUser?: string;
  name: string;
  cpf: string;
  phone: string;
  email: string;
  type: string;
  password?: string;
}

interface UserDb {
  idUser: string;
  email: string;
  profile: {
    type: string;
  };
  person: {
    cpf: string;
    name: string;
    contact: {
      phone: string;
    };
  };
}

export const formatUser = (user: UserDb) => {
  return {
    idUser: user.idUser,
    email: user.email,
    cpf: user.person.cpf,
    name: user.person.name,
    phone: user.person.contact.phone,
    type: user.profile.type,
  };
};
