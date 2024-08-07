export const CollectionObjectSelect = ({
  handleCollection,
  collections,
}: {
  handleCollection: any;
  collections: any;
}) => {
  return (
    <>
      <label htmlFor="collection-object" className="text-black">
        Escolha a coleção do objeto:
      </label>

      <select
        id="collection-object"
        className="w-full bg-black p-2"
        defaultValue={'DEFAULT'}
        onChange={handleCollection}
      >
        <option value="DEFAULT" disabled>
          Selecione a coleção do objeto
        </option>
        {collections ? (
          collections?.map((collection: any) => (
            <option
              key={collection.idCollection}
              value={collection.idCollection}
            >
              {collection.name}
            </option>
          ))
        ) : (
          <div>Loading...</div>
        )}
      </select>
    </>
  );
};
