import React, { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}

export const TextButton: React.FC<ButtonProps> = ({
  children,
  onClick,
  className = "bg-primary hover:bg-primary-hover active:bg-blue-800",
  type = "button",
  ...props
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-full py-3  font-body font-medium text-base/6 text-white  rounded outline-none transition-colors duration-150 cursor-pointer flex items-center justify-center px-2 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export const PageButton: React.FC<ButtonProps> = ({
  children,
  onClick,
  className = "bg-primary hover:bg-primary-hover active:bg-blue-800",
  type = "button",
  ...props
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={` p-2 font-body font-medium text-base/6 text-white rounded outline-none transition-colors duration-150 cursor-pointer flex items-center justify-center ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
