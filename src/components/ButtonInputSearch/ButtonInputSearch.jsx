import React from "react";
import { SearchOutlined } from "@ant-design/icons";
import InputComponent from "../InputComponent/InputComponent";
import ButtonComponent from "../ButtonComponent/ButtonComponent";

const ButtonInputSearch = (props) => {
  const { size, placeholder, textButton } = props;
  return (
    <div style={{ display: "flex", backgroundColor: "#fff" }}>
      <InputComponent
        style={{ border: "none" }}
        size={size}
        placeholder={placeholder}
        {...props}
      />
      <ButtonComponent
        size={size}
        styleButton={{ border: "none" }}
        icon={<SearchOutlined />}
        textButton={textButton}
      />
    </div>
  );
};

export default ButtonInputSearch;
