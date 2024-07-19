export function validate(email: string, password: string) {
  function validateEmail(email: string) {
    const re: RegExp = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  if (!email || !password) {
    return { error: 'E-mail e senha são campos obrigatórios.' };
  }

  if (!validateEmail(email)) {
    return { error: 'E-mail inválido.' };
  }

  return { success: 'Logado com sucesso' };
}
