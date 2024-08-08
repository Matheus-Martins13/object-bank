import { ObjectDto } from '@/dtos/object.dto';
import { formatObjectType } from '@/utils/format-object-type';

export const Metadata = ({ object }: { object: ObjectDto }) => {
  return (
    <div className="mt-8">
      <div className="text-black">
        <div className="text-black">
          <span className="text-black font-bold">Coleção: </span>
          {object.collection.name}
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
          {formatObjectType(object.type as string)}
        </div>

        <div className="text-black">
          <span className="font-bold text-black">Tamanho do arquivo: </span>
          {Number(object.objectFile.size) / 1000} kb
        </div>
      </div>
    </div>
  );
};
