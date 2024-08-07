import { isSuported } from './is-suported';
import { ObjectSendDto } from '@/dtos/object.dto';

export const validateObject = (object: ObjectSendDto) => {
  if (!object.name) {
    return { error: true, message: 'O nome do objeto é obrigatório' };
  }
  if (!object.description) {
    return { error: true, message: 'A descrição do objeto é obrigatória' };
  }
  if (!object.collection) {
    return {
      error: true,
      message: 'A coleção do objeto deve ser selecionada',
    };
  }

  if (!object.objectFile) {
    return {
      error: true,
      message: 'Você deve enviar um arquivo para o objeto',
    };
  }

  if (!isSuported(object.objectFile.type)) {
    return { error: true, message: 'Tipo de arquivo não suportado' };
  }

  return { error: false, message: 'Objeto pronto para cadastro' };
};
