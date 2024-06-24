import React from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { BiDollar } from "react-icons/bi";

interface InputProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  formatPrice?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  type,
  disabled,
  formatPrice,
  required,
  register,
  errors,
}) => {
  return (
    <div className="w-full relative">
      {formatPrice && (
        <BiDollar size={24} className="text-neutral-700 absolute top-5 left-2" />
      )}
      <input
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        placeholder=" "
        type={type}
        className={`
          peer w-full p-3 lg:p-3 md:p-3 pt-5 md:pt-6 font-light bg-white border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed
          ${formatPrice ? "pl-8 md:pl-9" : "pl-3 md:pl-4"}
          ${errors[id] ? "border-rose-500" : "border-neutral-300"}
          ${errors[id] ? "focus:border-rose-500" : "focus:border-gray-600"}
        `}
      />
      <label
        htmlFor={id}
        className={`
          absolute text-md md:text-lg duration-150 transform -translate-y-3 top-5 lg:top-3 z-10 origin-[0]
          ${formatPrice ? "left-8 md:left-9" : "left-3 md:left-4"}
          peer-placeholder-shown:scale-100
          peer-placeholder-shown:translate-y-0
          peer-focus:scale-75
          lg:peer-focus:scale-40
          peer-focus:-translate-y-4
          lg:peer-focus:-translate-y-1
          lg:-mb-2
          ${errors[id] ? "text-rose-500" : "text-zinc-400"}
        `}
      >
        {label}
        {required && <span className="text-rose-500 pl-2">*</span>}
      </label>
    </div>
  );
};

export default Input;
