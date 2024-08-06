import { ObjectDto } from '@/dtos/object.dto';

export const Picture = ({
  object,
  className,
}: {
  object: ObjectDto;
  className?: string;
}) => {
  const { mimetype } = object.objectFile;

  if (
    mimetype.startsWith('image/png') ||
    mimetype.startsWith('image/jpg') ||
    mimetype.startsWith('image/jpeg')
  ) {
    return <img src={object.objectFile.path} className={className} />;
  }

  if (mimetype === 'video/mp4') {
    return (
      <video
        className={className}
        autoPlay={true}
        muted
        loop
        src={object.objectFile.path}
      ></video>
    );
  }

  return <img src={object.objectPicture.path} className={className} />;
};
