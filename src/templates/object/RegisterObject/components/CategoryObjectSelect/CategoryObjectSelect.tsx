export const CategoryObjectSelect = ({
  handleCategory,
  categories,
}: {
  handleCategory: any;
  categories: any;
}) => {
  return (
    <>
      <label htmlFor="category-object" className="text-black">
        Escolha a categoria do objeto:
      </label>

      <select
        id="category-object"
        className="w-full bg-black p-2"
        defaultValue={'DEFAULT'}
        onChange={handleCategory}
      >
        <option value="DEFAULT" disabled>
          Selecione a categoria do objeto
        </option>
        {categories ? (
          categories?.map((cat: any) => (
            <option key={cat.idCategory} value={cat.idCategory}>
              {cat.name}
            </option>
          ))
        ) : (
          <div>Loading...</div>
        )}
      </select>
    </>
  );
};
