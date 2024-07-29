import { ObjectDto } from "@/dtos/object.dto";

export const Header = ({ object }: { object: ObjectDto }) => {
  return (
    <div id="header-object" className="flex justify-between">
      <div id="object-title" className="font-bold text-xl mb-4">
        <h1 className="text-black">{object.name}</h1>
      </div>
      <div id="favorite" className="text-black">S2</div>
    </div>
  );
};
