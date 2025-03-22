import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button
      className="mb-6 text-3xl bg-sky-200 rounded-3xl cursor-pointer h-[62px] w-[341px] max-sm:w-full hover:bg-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 flex items-center justify-center transition-colors"
      {...props}
    >
      {children}
    </button>
  );
};
