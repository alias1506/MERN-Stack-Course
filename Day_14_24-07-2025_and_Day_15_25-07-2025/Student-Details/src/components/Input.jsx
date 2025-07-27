import React from "react";

export const Input = ({
  type = "text",
  value,
  onChange,
  placeholder = "",
  className = "",
  name,
}) => {
  return (
    <input
      type={type}
      name={name} // 👈 important!
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`rounded-xl border border-gray-300 px-4 py-2 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 w-full ${className}`}
    />
  );
};

export default Input;
