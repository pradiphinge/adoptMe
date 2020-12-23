import React, { useState, FunctionComponent } from "react";

const useDropdown = (
  label: string,
  defaultState: string,
  options: string[]
) => {
  const [state, setState] = useState(defaultState);

  const id = `use-dropdown-${label.replace(" ", "").toLowerCase()}`;

  const Dropdown: FunctionComponent = () => (
    <>
      <label htmlFor={id}>{label}</label>
      <select
        name={id}
        id={id}
        value={state}
        onChange={(e) => setState(e.target.value)}
        onBlur={(e) => setState(e.target.value)}
        disabled={options.length === 0}
      >
        <option />
        {options.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </>
  );
  return [state, setState, Dropdown] as const;
};

export default useDropdown;
