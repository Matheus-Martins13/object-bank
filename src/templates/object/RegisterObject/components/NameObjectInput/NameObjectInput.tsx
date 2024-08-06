export const NameObjectInput = ({
  objectName,
  handleObjectName,
}: {
  objectName: string;
  handleObjectName: any;
}) => {
  return (
    <>
      <label htmlFor="object-name" className="text-black">
        Nome do objeto
      </label>
      <input
        placeholder="Nome do objeto"
        type="text"
        name="object-name"
        id="object-name"
        value={objectName}
        onChange={handleObjectName}
        className="w-full bg-black p-2"
      />
    </>
  );
};
