import React, { useEffect, useState } from "react";

let timer;

const InputDebounce = (props) => {
  const { onChange, value, debounceTime, ...params } = props;
  const [val, setVal] = useState("");

  function debounce(func, timeout = 300) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func();
    }, timeout);
  }

  useEffect(() => {
    setVal(value);
  }, [value]);

  const handleChangeVal = (event) => {
    const theValue = event.target.value;
    setVal(theValue);
    debounce(() => onChange(theValue), debounceTime);
  };

  return <input onChange={handleChangeVal} value={val} {...params} />;
};

export default InputDebounce;
