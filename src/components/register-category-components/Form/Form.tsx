import { ChangeEvent } from 'react';

export const Form = ({
  category,
  handleCategory,
  handleSend,
}: {
  category: string;
  handleCategory: (event: ChangeEvent<HTMLInputElement>) => void;
  handleSend: (event: any) => Promise<string | undefined>;
}) => {
  return (
    <form onSubmit={handleSend}>
      <label htmlFor="category-input-name" className="block">
        Nome da categoria:
      </label>
      <input
        type="text"
        name=""
        id="category-input-name"
        value={category}
        onChange={handleCategory}
        placeholder="Nome da categoria"
        style={{ backgroundColor: 'black' }}
      />

      <input type="submit" placeholder='send'/>
    </form>
  );
};
