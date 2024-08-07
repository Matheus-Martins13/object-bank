import { MyAccordion, Topic } from '@/components';
import { CollectionWithObjectsDto } from '@/dtos/collection.dto';
import { EditCollectionModal, ObjectAccordion } from './components';
import { removeCollection } from '@/services/axios';
import DeleteIcon from '@mui/icons-material/Delete';
import toast from 'react-hot-toast';

export const CollectionAccordion = ({
  collection,
  loadCollections,
  collections,
}: {
  collection: CollectionWithObjectsDto;
  loadCollections: () => {};
  collections: CollectionWithObjectsDto[];
}) => {
  const handleDelete = async (event: any) => {
    event.preventDefault();
    try {
      const confirm = window.confirm(
        `Você tem certeza que deseja apagar a coleção '${collection.name}'?`,
      );

      if (confirm) {
        if (collection.object.length > 0)
          return toast.error(
            'Você não pode apagar coleções com objetos cadastrados',
          );
        const response = await removeCollection(collection.idCollection);
        if (response.error) return toast.error(response.message);

        toast.success(`Coleção '${collection.name}' apagada com sucesso`);
        loadCollections();
      }
    } catch (err) {
      console.log('ERR: ' + err);
    }
  };

  return (
    <MyAccordion
      title={collection.name}
      summaryStyle={{ backgroundColor: '#333', color: 'white' }}
      titleClassName="font-bold break-all"
      detailClassName="bg-gray-100"
      expandedIconStyle={{ color: 'white' }}
    >
      <Topic
        textBold="Quantidade de objetos: "
        textNormal={collection.object.length.toString()}
      />
      <div className="flex mt-4">
        <EditCollectionModal
          collection={collection}
          loadCollections={loadCollections}
        />
        <button onClick={handleDelete}>
          <DeleteIcon color="error" />
        </button>
      </div>

      {collection.object.length > 0 ? (
        <div>
          <p className="text-black font-bold mt-5 mb-3">Objetos:</p>
          {collection.object.map((object) => {
            return (
              <div className="my-2" key={object.idObject}>
                <ObjectAccordion
                  object={object}
                  loadCollections={loadCollections}
                  collections={collections}
                />
              </div>
            );
          })}
        </div>
      ) : (
        <></>
      )}
    </MyAccordion>
  );
};
