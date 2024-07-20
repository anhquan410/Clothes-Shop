import React from "react";
import { Button } from "antd";

const ButtonComponent = ({ size, styleButton, textButton, ...rests }) => {
  return (
    <Button size={size} style={styleButton} {...rests}>
      <span>{textButton}</span>
    </Button>
  );
};

export default ButtonComponent;
