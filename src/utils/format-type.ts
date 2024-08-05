export const formatTypes = (mimetype: string) => {
  switch (mimetype) {
    case 'image/png':
      return 'Imagem PNG';

    case 'image/jpg' || 'image/jpeg':
      return 'Imagem JPEG';

    case 'video/mp4':
      return 'Vídeo MP4';

    case 'application/ai' || 'application/postscript':
      return 'Vetor AI';

    case 'application/pdf':
      return 'PDF';

    case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
      return 'Apresentação PPTX';

    case 'audio/mpeg':
      return 'Áudio MP3';

    default:
      return 'Tipo de arquivo não identificado';
  }
};
