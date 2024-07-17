import { ObjectDto } from "@/dtos/object.dto";

export const Header = ({ object }: { object: ObjectDto }) => {
  return (
    <div id="header" className="flex justify-between">
      <div id="object-title" className="font-bold text-xl mb-4">
        <h1>{object.name}</h1>
      </div>
      <div id="favorite">S2</div>
    </div>
  );
};
