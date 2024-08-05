import { MyAccordion } from '@/components/global-components';
import { EditSubcategoryModal, ObjectAccordion } from './components';
import { SubcategoryWithObjectsDto } from '@/dtos/subcategory.dto';
import DeleteIcon from '@mui/icons-material/Delete';
import { CategoryWithSubcategoriesDto } from '@/dtos/category.dto';

export const SubcategoryAccordion = ({
  subcategory,
  loadCategories,
  categories,
}: {
  subcategory: SubcategoryWithObjectsDto;
  loadCategories: () => {};
  categories: CategoryWithSubcategoriesDto[];
}) => {
  return (
    <MyAccordion
      title={subcategory.name}
      titleClassName="text-black font-bold break-all"
      summaryClassName="bg-gray-200 block"
      detailClassName="bg-gray-100"
    >
      {subcategory.object.map((object) => {
        return (
          <div>
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
              <DeleteIcon color="error" />
            </div>

            <p className="text-black font-bold mt-5 mb-3">Objetos:</p>

            <ObjectAccordion
              object={object}
              loadCategories={loadCategories}
              key={object.idObject}
              categories={categories}
            />
          </div>
        );
      })}
    </MyAccordion>
  );
};
