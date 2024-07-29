'use client';

import CreatableSelect from 'react-select/creatable';
import { styles } from './style';

export const Multiselect = ({
  tags,
  tagsSelected,
  handleTags,
  handleTag,
  handleSendTag
}: {
  tags: any;
  tagsSelected: any;
  handleTags: (event: any) => void;
  handleTag: (event: any) => void;
  handleSendTag: (event: any) => void;
}) => {
  return (
    <CreatableSelect
      isClearable
      closeMenuOnSelect={false}
      isMulti
      value={tagsSelected}
      options={tags}
      styles={styles}
      onChange={handleTags}
      onInputChange={handleTag}
      onKeyDown={handleSendTag}
      placeholder="Escolha as tags"
    />
  );
};
