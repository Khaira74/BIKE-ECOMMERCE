import React from "react";
import { Eye, EyeOff } from "lucide-react";

const InputField = ({
  label,
  type,
  name,
  value,
  onChange,
  showEyeIcon,
  toggleVisibility,
}) => {
  return (
    <div className="relative">
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={label}
        className="w-full px-4 py-2 rounded-md bg-gray-100 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
      />
      {showEyeIcon && (
        <div
          className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-gray-500"
          onClick={toggleVisibility}
        >
          {type === "password" ? <EyeOff /> : <Eye />}
        </div>
      )}
    </div>
  );
};

export default InputField;
