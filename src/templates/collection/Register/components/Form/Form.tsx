import { ChangeEvent } from 'react';

export const Form = ({
  collection,
  handleCollection,
  handleSend,
}: {
  collection: string;
  handleCollection: (event: ChangeEvent<HTMLInputElement>) => void;
  handleSend: (event: any) => Promise<string | undefined>;
}) => {
  return (
    <form onSubmit={handleSend}>
      <label htmlFor="collection-input-name" className="block">
        Nome da coleção:
      </label>
      <input
        type="text"
        name=""
        id="collection-input-name"
        value={collection}
        onChange={handleCollection}
        placeholder="Nome da coleção"
        style={{ backgroundColor: 'black' }}
      />

      <input type="submit" placeholder="send" />
    </form>
  );
};
