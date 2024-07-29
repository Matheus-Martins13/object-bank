export const ThumbObjectInput = ({ handleThumb }: { handleThumb: any }) => {
  return (
    <>
      <label htmlFor="object-thumb" className="text-black">
        Thumb:
      </label>
      <input
        type="file"
        accept="image/png, image/jpeg"
        name="object-thumb"
        id="object-thumb"
        onChange={handleThumb}
        className="w-full bg-black p-2"
      />
    </>
  );
};
