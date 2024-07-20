import React, { useEffect, useState } from "react";
import NavbarComponent from "../../NavbarComponent/NavbarComponent";
import CardComponent from "../../components/CardComponent/CardComponent";
import { Row, Col, Pagination } from "antd";
import { WrapperNavbar, WrapperProducts } from "./style";
import { useLocation } from "react-router-dom";
import * as ProductService from "../../services/ProductService";

const TypeProductPage = () => {
  const { state } = useLocation();
  const onChange = () => {};
  const [products, setProducts] = useState([]);
  const fetchProductType = async (type) => {
    const res = await ProductService.getProductType(type);
    if (res?.status == "OK") {
      setProducts(res?.data);
    } else {
    }
  };

  useEffect(() => {
    if (state) {
      fetchProductType(state);
    }
  });

  return (
    <div style={{ padding: "0 120px", background: "#efefef" }}>
      <Row style={{ flexWrap: "nowrap", paddingTop: "10px" }}>
        <WrapperNavbar span={4}>
          <NavbarComponent />
        </WrapperNavbar>
        <Col span={20}>
          <WrapperProducts>
            {products?.map((product) => {
              return (
                <CardComponent
                  key={product._id}
                  countInStock={product.countInStock}
                  description={product.description}
                  image={product.image}
                  name={product.name}
                  price={product.price}
                  rating={product.rating}
                  type={product.type}
                  selled={product.selled}
                  discount={product.discount}
                  id={product._id}
                />
              );
            })}
          </WrapperProducts>
          <Pagination
            defaultCurrent={6}
            total={10}
            onChange={onChange}
            style={{ textAlign: "center", marginTop: "15px" }}
          />
        </Col>
      </Row>
    </div>
  );
};

export default TypeProductPage;
