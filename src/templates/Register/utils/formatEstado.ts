export const formatEstado = (uf: string) => {
  switch (uf) {
    case 'RO':
      return 'Rondônia';
    case 'AC':
      return 'Acre';
    case 'AM':
      return 'Amazonas';
    case 'RR':
      return 'Roraima';
    case 'PA':
      return 'Paraná';
    case 'AP':
      return 'Amapá';
    case 'TO':
      return 'Tocantins';
    case 'MA':
      return 'Maranhão';
    case 'PI':
      return 'Piauí';
    case 'CE':
      return 'Ceará';
    case 'RN':
      return 'Rio Grande do Norte';
    case 'PB':
      return 'Paraíba';
    case 'PE':
      return 'Pernambuco';
    case 'AL':
      return 'Alagoas';
    case 'SE':
      return 'Sergipe';
    case 'BA':
      return 'Bahia';
    case 'MG':
      return 'Minas Gerais';
    case 'ES':
      return 'Espírito Santo';
    case 'RJ':
      return 'Rio de Janeiro';
    case 'SP':
      return 'São Paulo';
    case 'PR':
      return 'Paraná';
    case 'SC':
      return 'Santa Catarina';
    case 'RS':
      return 'Rio Grande do Sul';
    case 'MS':
      return 'Mato Grosso do Sul';
    case 'MT':
      return 'Mato Grosso';
    case 'GO':
      return 'Goiás';
    case 'DF':
      return 'Distrito Federal';
    default:
      return '';
  }
};
