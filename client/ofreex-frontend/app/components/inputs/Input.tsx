"use client";

import { useState } from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  disabled?: boolean;
  placeholderString?: string;
  formatPrice?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors?: FieldErrors;
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
    <>
      <label className="text-gray-900 font-medium block mb-2">
        {label}
      </label>
      <input
      id={id}
      {...register(id, {required})}
      value={value}
      onChange={onChange}
      className={className}
      {...rest}
      />
    </>
  );
};

export default Input;
