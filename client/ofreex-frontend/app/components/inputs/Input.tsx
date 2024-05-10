'use client';

import { useState } from "react";
import {
  FieldErrors,
  FieldValues,
  UseFormRegister
} from "react-hook-form";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label?: string;
  disabled?: boolean;
  placeholderString?: string;
  formatPrice?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>,
  errors?: FieldErrors
  className?: string;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  disabled,
  formatPrice,
  register,
  placeholderString = " ",
  required,
  errors,
  className,
  ...rest
}) => {
  const [value, setValue] = useState<string>(placeholderString);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  return (
    <div className="w-full relative">
      <input
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        value={value}
        onChange={onChange}
        className={className}
        {...rest}
      />
    </div>
  );
}

export default Input;
