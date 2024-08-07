import { MyAccordion } from '@/components/global-components';
import { EditSubcategoryModal, ObjectAccordion } from './components';
import { SubcategoryWithObjectsDto } from '@/dtos/subcategory.dto';
import { CategoryWithSubcategoriesDto } from '@/dtos/category.dto';
import DeleteIcon from '@mui/icons-material/Delete';

import toast from 'react-hot-toast';
import { removeSubcategory } from '@/services/axios';

export const SubcategoryAccordion = ({
  subcategory,
  loadCategories,
  categories,
}: {
  subcategory: SubcategoryWithObjectsDto;
  loadCategories: () => {};
  categories: CategoryWithSubcategoriesDto[];
}) => {
  const handleDelete = async (event: any) => {
    event.preventDefault();
    try {
      const confirm = window.confirm(
        `Você tem certeza que deseja apagar a subcategoria '${subcategory.name}'?`,
      );

      if (confirm) {
        if (subcategory.object.length > 0)
          return toast.error(
            'Você não pode apagar subcategorias com objetos cadastrados',
          );
        const response = await removeSubcategory(subcategory.idSubcategory);
        if (response.error) return toast.error(response.message);

        toast.success(`Subcategoria '${subcategory.name}' apagada com sucesso`);
        loadCategories();
      }
    } catch (err) {
      console.log('ERR: ' + err);
    }
  };

  return (
    <MyAccordion
      title={subcategory.name}
      titleClassName="text-black font-bold break-all"
      summaryClassName="bg-gray-200 block"
      detailClassName="bg-gray-100"
    >
      <div className="text-black my-5">
        <span className="text-black font-bold me-2">
          Quantidade de objetos:
        </span>
        {subcategory.object.length}
      </div>
      <div className="flex mt-4">
        <EditSubcategoryModal
          subcategory={subcategory}
          loadCategories={loadCategories}
        />
        <button onClick={handleDelete}>
          <DeleteIcon color="error" />
        </button>
      </div>

      {subcategory.object.length > 0 ? (
        <div>
          <p className="text-black font-bold mt-5 mb-3">Objetos:</p>
          {subcategory.object.map((object) => {
            return (
              <div className="my-2" key={object.idObject}>
                <ObjectAccordion
                  object={object}
                  loadCategories={loadCategories}
                  categories={categories}
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
