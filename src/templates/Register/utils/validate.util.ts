export function validate(data: any) {
  const validateEmail = (email: string) => {
    const re: RegExp = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  const requiredProps = [
    'Nome',
    'CPF',
    'Data de nascimento',
    'CEP',
    'Estado',
    'Número',
    'Cidade',
    'Bairro',
    'Logradouro',
    'Telefone celular',
    'E-mail',
    'Senha',
  ];

  if (
    !data.name ||
    !data.cpf ||
    !data.birthday ||
    !data.cep ||
    !data.estado ||
    !data.numero ||
    !data.cidade ||
    !data.bairro ||
    !data.logradouro ||
    !data.phone ||
    !data.email ||
    !data.password
  ) {
    return {
      error: requiredProps.join(', ') + ' são campos obrigatórios',
    }
  }

  if (!validateEmail(data.email)) {
    return { error: 'E-mail inválido.' };
  }

  return { success: true };
}
