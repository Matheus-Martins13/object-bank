'use client';

import CreatableSelect from 'react-select/creatable';
import { styles } from './style';

export const Multiselect = ({
  tags,
  tagsSelected,
  handleTags,
  handleTag,
}: {
  tags: any;
  tagsSelected: any;
  handleTags: (event: any) => void;
  handleTag: (event: any) => void;
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
      placeholder="Escolha as tags"
    />
  );
};
