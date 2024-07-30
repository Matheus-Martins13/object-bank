export const SubcategoryObjectSelect = ({
  handleSubcategory,
  subcategories,
}: {
  handleSubcategory: any;
  subcategories: any;
}) => {
  return (
    <div>
      <label htmlFor="object-subcategory" className="text-black">
        Escolha a subcategoria do objeto:
      </label>

      <select
        id="object-subcategory"
        className="w-full bg-black p-2"
        defaultValue={'DEFAULT'}
        onChange={handleSubcategory}
      >
        <option value="DEFAULT" disabled>
          Selecione a subcategoria do objeto
        </option>

        {subcategories ? (
          subcategories?.map((subcat: any) => (
            <option key={subcat.idSubcategory} value={subcat.idSubcategory}>
              {subcat.name}
            </option>
          ))
        ) : (
          <div>Loading...</div>
        )}
      </select>
    </div>
  );
};
