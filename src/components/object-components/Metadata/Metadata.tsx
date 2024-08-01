import { ObjectDto } from '@/dtos/object.dto';

export const Metadata = ({
  object,
  objectType,
}: {
  object: ObjectDto;
  objectType: string;
}) => {
  return (
    <div className="mt-8">
      <div className="text-black">
        <div className="text-black">
          <span className="text-black font-bold">Categoria: </span>
          {object.category.name}{' '}
        </div>

        <div className="text-black">
          <span className="font-bold text-black">Subcategoria: </span>
          {object.subcategory.name}
        </div>

        <div className="text-black">
          <span className="font-bold text-black">Tags:</span>
          {object.tag.map((tag) => (
            <span key={tag.idTag} className="text-black">
              {`${tag.name} `}
            </span>
          ))}
        </div>

        <div className="text-black">
          <span className="font-bold text-black">Tipo do arquivo: </span>
          {objectType}
        </div>

        <div className="text-black">
          <span className="font-bold text-black">Tamanho do arquivo: </span>
          {Number(object.objectFile.size) / 1000} kb
        </div>
      </div>
    </div>
  );
};
