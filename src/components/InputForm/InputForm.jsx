import { Input } from "antd";
import React from "react";

const InputForm = (props) => {
  const { placeholder = "Nhập text", ...rests } = props;
  const handleOnChangeInput = (e) => {
    props.onChange(e.target.value);
  };

  return (
    <>
      <Input
        placeholder={placeholder}
        value={props.value}
        {...rests}
        onChange={handleOnChangeInput}
      />
    </>
  );
};

export default InputForm;
