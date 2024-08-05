import { MyAccordion } from '@/components/global-components';
import { CategoryWithSubcategoriesDto } from '@/dtos/category.dto';
import { EditCategoryModal, Topic, SubcategoryAccordion } from './components/';
import DeleteIcon from '@mui/icons-material/Delete';

export const CategoryAccordion = ({
  category,
  loadCategories,
  categories,
}: {
  category: CategoryWithSubcategoriesDto;
  loadCategories: () => {};
  categories: CategoryWithSubcategoriesDto[];
}) => {
  return (
    <MyAccordion
      title={category.name}
      summaryStyle={{ backgroundColor: '#333', color: 'white' }}
      titleClassName="font-bold break-all"
      detailClassName="bg-gray-100"
      expandedIconStyle={{ color: 'white' }}
    >
      <Topic
        textBold="Quantidade de subcategorias: "
        textNormal={category.subcategory.length.toString()}
      />
      <div className="flex mt-4">
        <EditCategoryModal
          category={category}
          loadCategories={loadCategories}
        />
        <DeleteIcon color="error" />
      </div>

      {category.subcategory.length > 0 && (
        <div>
          <p className="text-black font-bold mt-5 mb-3">Subcategorias:</p>

          {category.subcategory.map((subcategory) => {
            return (
              <div>
                <SubcategoryAccordion
                  subcategory={subcategory}
                  loadCategories={loadCategories}
                  categories={categories}
                />
              </div>
            );
          })}
        </div>
      )}
    </MyAccordion>
  );
};
