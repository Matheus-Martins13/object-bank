import { MyAccordion, Topic } from '@/components';
import { CategoryWithSubcategoriesDto } from '@/dtos/category.dto';
import { EditCategoryModal, SubcategoryAccordion } from './components/';
import DeleteIcon from '@mui/icons-material/Delete';
import { removeCategory } from '@/services/axios';
import toast from 'react-hot-toast';

export const CategoryAccordion = ({
  category,
  loadCategories,
  categories,
}: {
  category: CategoryWithSubcategoriesDto;
  loadCategories: () => {};
  categories: CategoryWithSubcategoriesDto[];
}) => {
  const handleDelete = async (event: any) => {
    event.preventDefault();
    try {
      const confirm = window.confirm(
        `Você tem certeza que deseja apagar a categoria '${category.name}'?`,
      );

      if (confirm) {
        if (category.subcategory.length > 0)
          return toast.error(
            'Você não pode apagar categorias com conteúdo cadastrado',
          );
        const response = await removeCategory(category.idCategory);
        if (response.error) return toast.error(response.message);

        toast.success(`Categoria '${category.name}' apagada com sucesso`);
        loadCategories();
      }
    } catch (err) {
      console.log('ERR: ' + err);
    }
  };

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
        <button onClick={handleDelete}>
          <DeleteIcon color="error" />
        </button>
      </div>

      {category.subcategory.length > 0 && (
        <div>
          <p className="text-black font-bold mt-5 mb-3">Subcategorias:</p>

          {category.subcategory.map((subcategory) => {
            return (
              <div key={subcategory.idSubcategory}>
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
