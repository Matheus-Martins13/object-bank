import Select from 'react-select';
import { styles } from './style';

export const Multiselect = ({ tags }: { tags: any }) => {
  return (
    <Select closeMenuOnSelect={false} isMulti options={tags} styles={styles} />
  );
};
