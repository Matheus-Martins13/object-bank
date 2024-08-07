export const Topic = ({
    textBold,
    textNormal,
  }: {
    textBold: string;
    textNormal: string;
  }) => {
    return (
      <p className="text-black break-all my-4">
        <span className="text-black font-bold">{textBold}</span>
        <span>{textNormal}</span>
      </p>
    );
  };
  