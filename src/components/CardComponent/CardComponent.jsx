import React from "react";
import { Card } from "antd";
import {
  StyleNameProduct,
  WrapperDiscountText,
  WrapperPriceText,
  WrapperReportText,
} from "./style";
import { StarFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const CardComponent = (props) => {
  const {
    countInStock,
    description,
    image,
    name,
    price,
    rating,
    type,
    discount,
    selled,
    id,
  } = props;
  const navigate = useNavigate();
  const handleDetailsProduct = (id) => {
    navigate(`/product-detail/${id}`);
  };
  return (
    <Card
      hoverable
      style={{ width: 240 }}
      cover={<img alt="example" src={image} />}
      onClick={() => handleDetailsProduct(id)}
    >
      <StyleNameProduct>{name}</StyleNameProduct>
      <WrapperReportText>
        <span>{rating}</span>
        <StarFilled style={{ fontSize: "10px", color: "yellow" }} />
        <span> | Đã bán {selled || 1000}+</span>
      </WrapperReportText>
      <WrapperPriceText>
        <span>{price?.toLocaleString()}</span>
        <WrapperDiscountText>- {discount || 5}%</WrapperDiscountText>
      </WrapperPriceText>
    </Card>
  );
};

export default CardComponent;
