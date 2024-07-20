import React from "react";
import ProductDetailsComponent from "../../components/ProductDetailsComponent/ProductDetailsComponent";
import { useParams, useNavigate } from "react-router-dom";

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  return (
    <div style={{ padding: "0 120px", background: "#efefef", height: "800px" }}>
      <h5 style={{ marginTop: "0" }}>
        <span
          style={{ cursor: "pointer" }}
          onClick={() => {
            navigate("/");
          }}
        >
          Trang chủ
        </span>{" "}
        - Chi tiết sản phẩm
      </h5>
      <ProductDetailsComponent idProduct={id} />
    </div>
  );
};

export default ProductDetailPage;
