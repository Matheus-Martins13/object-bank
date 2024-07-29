import { StylesConfig } from 'react-select';

export const styles: StylesConfig<any, true> = {
  input: (styles) => ({
    ...styles,
    color: 'white',
  }),
  control: (styles, { menuIsOpen }) => ({
    ...styles,
    backgroundColor: 'black',
    color: 'white',
  }),
  menu: (styles) => ({
    ...styles,
    backgroundColor: 'red',
    color: 'white',
  }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      backgroundColor: isFocused ? 'pink' : 'red',
      color: 'white',
      cursor: isDisabled ? 'not-allowed' : 'default',
      ':active': {
        ...styles[':active'],
        backgroundColor: !isDisabled
          ? isSelected
            ? data.color
            : 'red'
          : undefined,
      },
    };
  },
  multiValue: (styles) => {
    return {
      ...styles,
      backgroundColor: 'orange',
    };
  },
  multiValueLabel: (styles, { data }) => ({
    ...styles,
    color: data.color,
  }),
  multiValueRemove: (styles) => ({
    ...styles,
    color: 'red',
    ':hover': {
      backgroundColor: 'red',
      color: 'white',
    },
  }),
};