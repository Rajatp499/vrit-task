import React, { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  id?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  value,
  onChange,
  id,
  type = "text",
  placeholder,
  required = false,
  autoComplete,
  className = "",
  ...props
}) => {

  return (
    <div className="flex flex-col gap-2 mb-4">
      {label && (
        <label className="text-md font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required={required}
        className={` min-w-0 border rounded py-3 px-4 font-body text-base/6 text-gray-900 bg-white outline-none transition-[border-color,box-shadow] duration-150 ${className}`}
        {...props}
      />
    </div>
  );
};
