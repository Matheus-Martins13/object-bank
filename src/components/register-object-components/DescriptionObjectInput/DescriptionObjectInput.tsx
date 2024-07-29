export const DescriptionObjectInput = ({
  objectDescription,
  handleObjectDescription,
}: {
  objectDescription: string;
  handleObjectDescription: any;
}) => {
  return (
    <>
      <label htmlFor="object-description" className="text-black">
        Descrição do objeto
      </label>
      <textarea
        placeholder="Descrição do objeto"
        name="object-description"
        id="object-description"
        value={objectDescription}
        onChange={handleObjectDescription}
        className="w-full bg-black p-2"
      />
    </>
  );
};
