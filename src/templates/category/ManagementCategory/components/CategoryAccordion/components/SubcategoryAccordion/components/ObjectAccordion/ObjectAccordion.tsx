import { MyAccordion } from '@/components/global-components';
import { ObjectDto } from '@/dtos/object.dto';
import { Topic } from '@/templates/category/ManagementCategory/components/CategoryAccordion/components';
import { formatTypes } from '@/utils/format-type';
import { EditObjectModal } from './components';
import { CategoryWithSubcategoriesDto } from '@/dtos/category.dto';
import { SubcategoryWithObjectsDto } from '@/dtos/subcategory.dto';
import Link from 'next/link';

export const ObjectAccordion = ({
  object,
  loadCategories,
  categories,
}: {
  object: ObjectDto;
  loadCategories: () => {};
  categories: CategoryWithSubcategoriesDto[];
}) => {
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
          loadCategories={loadCategories}
          object={object}
          categories={categories}
        />
        <span className="text-red-600">Apagar</span>
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
