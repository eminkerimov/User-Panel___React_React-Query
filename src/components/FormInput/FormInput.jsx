import { useState } from "react";
import "./FormInput.scss";

const FormInput = (props) => {
  const [focused, setFocused] = useState(false);
  const {
    label,
    required,
    errorMessage,
    onChange,
    ...inputProps
  } = props;

  const handleFocus = (e) => {
    setFocused(true);
  };

  return (
    <div className="formInput">
      <label className={required ? "required" : ""}>{label}</label>
      <input
        {...inputProps}
        onChange={onChange}
        onBlur={handleFocus}
        onFocus={() => setFocused(true)}
        focused={focused.toString()}
        required={required}
      />
      <span>{errorMessage}</span>
    </div>
  );
};

export default FormInput;
