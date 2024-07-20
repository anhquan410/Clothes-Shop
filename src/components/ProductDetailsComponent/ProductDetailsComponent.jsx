import React from "react";
import { Col, Row, Image, InputNumber, Rate } from "antd";
import imageProduct1 from "../../assets/images/test1.jpg";
import imageProduct2 from "../../assets/images/test2.jpg";
import imageProduct3 from "../../assets/images/test3.jpg";
import {
  WrapperAdderssProduct,
  WrapperPriceProduct,
  WrapperQualityProduct,
  WrapperStyleColImage,
  WrapperStyleImgSmall,
  WrapperStyleInforProduct,
  WrapperStyleNameProduct,
} from "./style";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import * as ProductService from "../../services/ProductService";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useSelector } from "react-redux";

const ProductDetailsComponent = ({ idProduct }) => {
  const [numProduct, setNumProduct] = useState();
  const user = useSelector((state) => state.user);
  const onChange = (value) => {
    setNumProduct(Number(value));
  };
  const fetchGetDetailsProduct = async (context) => {
    const id = context?.queryKey && context?.queryKey[1];
    if (id) {
      const res = await ProductService.getDetailsProduct(id);
      return res.data;
    }
  };
  const handleChangeCount = (type) => {
    if (type === "increase") {
      setNumProduct(numProduct + 1);
    } else if (type === "decrease") {
      setNumProduct(numProduct - 1);
    }
  };

  const { data: productDetails } = useQuery({
    queryKey: ["product-details", idProduct],
    queryFn: fetchGetDetailsProduct,
    enable: !!idProduct,
  });
  return (
    <div>
      <Row style={{ padding: "16px", background: "#fff" }}>
        <Col span={6}>
          <Row align="middle">
            <Image
              height="600px"
              src={productDetails?.image}
              alt="image product1"
              preview={false}
            />
          </Row>
        </Col>
        <Col span={5}>
          <WrapperStyleColImage>
            <WrapperStyleImgSmall
              height="150px"
              src={imageProduct1}
              alt="image product small"
            />
          </WrapperStyleColImage>
          <WrapperStyleColImage>
            <WrapperStyleImgSmall
              height="150px"
              src={imageProduct2}
              alt="image product small"
            />
          </WrapperStyleColImage>
          <WrapperStyleColImage>
            <WrapperStyleImgSmall
              height="150px"
              src={imageProduct3}
              alt="image product small"
            />
          </WrapperStyleColImage>
          <WrapperStyleColImage>
            <WrapperStyleImgSmall
              height="150px"
              src={imageProduct1}
              alt="image product small"
            />
          </WrapperStyleColImage>
        </Col>
        <Col span={10}>
          <WrapperStyleNameProduct>
            Chân váy xẻ gấu trước
          </WrapperStyleNameProduct>
          <WrapperStyleInforProduct>
            <Rate
              allowHalf
              defaultValue={productDetails?.rating}
              value={productDetails?.rating}
            />
            <span style={{ margin: "0 15px" }}>SKU:M3001</span>
            <span style={{ margin: "0 10px 0 15px" }}> (10 đánh giá)</span>
            <span>| 50 Đã bán</span>
          </WrapperStyleInforProduct>
          <WrapperPriceProduct>
            <b
              style={{
                fontWeight: "600",
                fontSize: "24px",
                lineHeight: "32px",
                color: "#221f20",
              }}
            >
              {productDetails?.price.toLocaleString()}
            </b>
            <del
              style={{
                fontSize: "16px",
                lineHeight: "16px",
                color: "#a8a9ad",
                marginLeft: "4px",
              }}
            >
              890.000đ
            </del>
          </WrapperPriceProduct>
          <WrapperAdderssProduct>
            <span>Giao đến</span>
            <span className="address">{user?.address}</span>
            <span className="change-address">Đổi địa chỉ</span>
          </WrapperAdderssProduct>
          <WrapperQualityProduct>
            <div>Số lượng</div>
            <div style={{ marginTop: "10px" }}>
              <ButtonComponent
                icon={<PlusOutlined />}
                ocClick={() => handleChangeCount("increase")}
              />
              <InputNumber
                onChange={onChange}
                defaultValue={1}
                value={numProduct}
              />
              <ButtonComponent
                icon={<MinusOutlined />}
                ocClick={() => handleChangeCount("decrease")}
              />
            </div>
          </WrapperQualityProduct>
          <div>
            <ButtonComponent
              size="large"
              styleButton={{
                backgroundColor: "#221f20",
                color: "#f7f8f9",
                border: "1px solid transparent",
                marginRight: "10px",
                width: "150px",
                height: "45px",
              }}
              textButton="Thêm vào giỏ"
            />
            <ButtonComponent
              size="large"
              styleButton={{
                backgroundColor: "white",
                color: "#221f20",
                border: "1px solid #221f20",
                width: "150px",
                height: "45px",
              }}
              textButton="Mua hàng"
            />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ProductDetailsComponent;
