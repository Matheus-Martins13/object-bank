import { Multiselect } from './components/Multiselect';

export const TagObjectSelect = ({
  handleSendTag,
  tagsDb,
  tags,
  handleTags,
  handleTag,
}: {
  handleSendTag: any;
  tagsDb: any;
  tags: any;
  handleTags: any;
  handleTag: any;
}) => {
  return (
    <div className="w-2/4">
      {/* --------------- */}
      <label htmlFor="" className="text-black mt-6">
        Tags:
      </label>
      <Multiselect
        tags={tagsDb}
        tagsSelected={tags}
        handleTags={handleTags}
        handleTag={handleTag}
        handleSendTag={handleSendTag}
      />

      {/* --------------- */}
    </div>
  );
};
