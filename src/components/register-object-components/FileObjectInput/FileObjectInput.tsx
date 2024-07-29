export const FileObjectInput = ({
  handleObjectFile,
}: {
  handleObjectFile: any;
}) => {
  return (
    <>
      <label htmlFor="object-file" className="text-black">
        Objeto:
      </label>
      <input
        type="file"
        name="object-file"
        id="object-file"
        onChange={handleObjectFile}
        className="w-full bg-black p-2"
      />
    </>
  );
};
