import React from "react";

const InputForm = ({ label, ...params }) => {
  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text">{label}</span>
      </label>
      <input className="input input-bordered input-info w-full" {...params} />
    </div>
  );
};

export default InputForm;
