import React from "react";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const InputField: React.FC<InputFieldProps> = ({ label, ...props }) => {
  const id = `input-${label.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <div className="mb-10 w-full">
      <label htmlFor={id} className="mb-4 text-3xl block">
        {label}
      </label>
      <input
        id={id}
        className="w-full rounded-3xl bg-zinc-100 h-[62px] px-6 focus:outline-none focus:ring-2 focus:ring-sky-200"
        {...props}
      />
    </div>
  );
};
