import React, { ChangeEvent } from 'react';
import ReactInputMask from 'react-input-mask';
import './style.css';

export const Input = ({
  id,
  label,
  type,
  placeholder,
  value,
  onChange,
  className,
  style,
  disabled,
  mask,
  accept,
}: {
  id: string;
  label: string;
  type: string;
  placeholder?: string;
  value?: string | any;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  style?: React.CSSProperties;
  disabled?: boolean;
  mask: string;
  accept?: string;
}) => {
  return (
    <div>
      <label htmlFor={id} className="text-black block self-start p-2">
        {label}:
      </label>
      <ReactInputMask
        mask={mask}
        id={id}
        disabled={disabled}
        type={type}
        className={`block self-start p-2 ${className}`}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        style={style}
        accept={accept}
      />
    </div>
  );
};
