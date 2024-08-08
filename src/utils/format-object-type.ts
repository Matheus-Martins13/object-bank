export const formatObjectType = (type: string) => {
  switch (type) {
    case 'image':
      return 'Imagem';
    case 'video':
      return 'Vídeo';
    case 'illustrations':
      return 'Ilustração';
    case 'book':
      return 'Livro';
    case 'presentation':
      return 'Apresentação';
    case 'audio':
      return 'Áudio';
    default:
      return 'Arquivo não identificado';
  }
};
