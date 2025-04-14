import { useState } from "react";

function FloatingLabelSelect({ label, options, setValue, value }) {
  const [focus, setFocus] = useState(false);

  return (
    <div className="relative w-full">
      <label
        className={`absolute left-3 px-1 transition-all bg-white ${
          focus || value
            ? "-top-2 text-xs text-pink-500"
            : "top-3 text-gray-400"
        }`}
      >
        {label}
      </label>

      <select
        className="w-full bg-transparent border-2 border-gray-300 rounded-lg px-3 pt-4 pb-2 text-black outline-none focus:border-pink-500"
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        onChange={(e) => setValue(e.target.value)}
        value={value}
      >
        <option value="" disabled hidden></option> {/* Hidden default option */}
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default FloatingLabelSelect;
