export function validate(data: any) {
  const validateEmail = (email: string) => {
    const re: RegExp = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  if (!data.name) {
    return { error: "O campo 'nome' é obrigatório" };
  }
  if (!data.cpf) {
    return { error: "O campo 'CPF' é obrigatório" };
  }
  if (!data.phone) {
    return { error: "O campo 'telefone' é obrigatório" };
  }
  if (!data.email) {
    return { error: "O campo 'e-mail' é obrigatório" };
  }
  if (!data.password) {
    return { error: "O campo 'senha' é obrigatório" };
  }

  if (!validateEmail(data.email)) {
    return { error: 'E-mail inválido.' };
  }

  return { success: true };
}
