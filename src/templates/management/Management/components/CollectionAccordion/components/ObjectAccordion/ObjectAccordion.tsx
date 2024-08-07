import { MyAccordion } from '@/components/global-components';
import { ObjectDto } from '@/dtos/object.dto';
import { formatTypes } from '@/utils/format-type';
import { EditObjectModal } from './components';
import { CollectionWithObjectsDto } from '@/dtos/collection.dto';
import { Topic } from '@/components';

import Link from 'next/link';
import toast from 'react-hot-toast';
import { removeObject } from '@/services/axios';

export const ObjectAccordion = ({
  object,
  loadCollections,
  collections,
}: {
  object: ObjectDto;
  loadCollections: () => {};
  collections: CollectionWithObjectsDto[];
}) => {
  const handleDelete = async (event: any) => {
    event.preventDefault();
    try {
      const confirm = window.confirm(
        `Você tem certeza que deseja apagar o objeto '${object.name}'?`,
      );

      if (confirm) {
        const response = await removeObject(object.idObject);
        if (response.error) return toast.error(response.message);

        toast.success(`Objeto '${object.name}' apagado com sucesso`);
        loadCollections();
      }
    } catch (err) {
      console.log('ERR: ' + err);
    }
  };

  return (
    <MyAccordion
      title={object.name}
      titleClassName="text-black font-bold break-all"
      summaryClassName="bg-gray-200 block"
      detailClassName="bg-gray-100"
    >
      <Topic textBold="Proprietário: " textNormal={object.user.name} />

      <Topic textBold="Descrição: " textNormal={object.description} />
      <Topic
        textBold="Tipo de arquivo: "
        textNormal={formatTypes(object.objectFile.mimetype)}
      />

      <Topic
        textBold="Tamanho: "
        textNormal={`${Number(object.objectFile.size) / 1000} kb`}
      />

      <div className="flex mt-4">
        <EditObjectModal
          loadCollections={loadCollections}
          object={object}
          collections={collections}
        />

        <span className="text-red-600 cursor-pointer" onClick={handleDelete}>
          Apagar
        </span>

        <Link
          className="ms-4 text-amber-950"
          href={{
            pathname: '/object',
            query: { idObject: object.idObject },
          }}
        >
          Abrir
        </Link>
      </div>
    </MyAccordion>
  );
};
