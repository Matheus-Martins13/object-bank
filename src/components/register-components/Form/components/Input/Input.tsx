import React, { ChangeEvent } from 'react';
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
}: {
  id: string;
  label: string;
  type: string;
  placeholder?: string;
  value: string | any;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  style?: React.CSSProperties;
  disabled?: boolean;
}) => {
  return (
    <div>
      <label htmlFor={id} className="text-black block self-start p-2">
        {label}:
      </label>
      <input
        id={id}
        disabled={disabled}
        type={type}
        className={`block self-start p-2 ${className}`}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        style={style}
      />
    </div>
  );
};
