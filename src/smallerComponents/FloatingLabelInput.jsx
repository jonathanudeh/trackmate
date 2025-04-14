import { useState } from "react";

function FloatingLabelInput({ label, setValue, value, extraInfo }) {
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
        {label} {""}
        {!focus && !value && extraInfo}
      </label>
      <input
        type="text"
        className="w-full bg-transparent border-2 border-gray-300 rounded-lg px-3 pt-4 pb-2 text-black outline-none focus:border-pink-500"
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        onChange={(e) => setValue(e.target.value)}
        value={value}
      />
    </div>
  );
}

export default FloatingLabelInput;
