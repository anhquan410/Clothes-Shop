import React, { useEffect, useState } from "react";
import TypeProduct from "../../components/TypeProduct/TypeProduct";
import {
  WrapperButtonMore,
  WrapperProducts,
  WrapperTypeProduct,
  WrapperNameProductList,
} from "./style";
import SliderComponent from "../../components/SliderComponent/SliderComponent";
import slider1 from "../../assets/images/slider1.jpg";
import slider2 from "../../assets/images/slider2.jpg";
import slider3 from "../../assets/images/slider3.jpg";
import CardComponent from "../../components/CardComponent/CardComponent";
import { useQuery } from "@tanstack/react-query";
import * as ProductService from "../../services/ProductService";
import { useSelector } from "react-redux";
import { useDebounce } from "../../hooks/useDebounce";

const HomePage = () => {
  const searchProduct = useSelector((state) => state?.product?.search);
  const searchDebounce = useDebounce(searchProduct, 1000);
  const [limit, setLimit] = useState(5);
  const [typeProduct, setTypeProduct] = useState([]);
  const fetchProductAll = async (context) => {
    const limit = context?.queryKey && context?.queryKey[1];
    const search = context?.queryKey && context?.queryKey[2];
    const res = await ProductService.getAllProduct(search, limit);

    return res;
  };

  const fetchAllTypeProduct = async () => {
    const res = await ProductService.getAllTypeProduct();
    if (res?.status === "OK") {
      setTypeProduct(res?.data);
    }
  };

  const {
    isPending,
    data: products,
    isPreviousData,
  } = useQuery({
    queryKey: ["products", limit, searchDebounce],
    queryFn: fetchProductAll,
    retry: 3,
    retryDelay: 1000,
    keepPreviousData: true,
  });

  useEffect(() => {
    fetchAllTypeProduct();
  }, []);

  return (
    <>
      <div style={{ padding: "0 120px" }}>
        <WrapperTypeProduct>
          {typeProduct.map((item) => {
            return <TypeProduct name={item} key={item} />;
          })}
        </WrapperTypeProduct>
      </div>
      <div
        id="container"
        style={{ padding: "0 120px", backgroundColor: "#efefef" }}
      >
        <SliderComponent arrImages={[slider1, slider2, slider3]} />
        <WrapperNameProductList>Bộ sưu tập nam</WrapperNameProductList>
        <WrapperProducts>
          {products?.data?.map((product) => {
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
        <div
          style={{
            marginTop: "15px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <WrapperButtonMore
            // disable={products.total === products?.data?.length}
            onClick={() => setLimit((prev) => prev + 6)}
            textButton="Xem tất cả"
            type="outline"
            styleButton={{
              backgroundColor: "#fff",
              border: "1px  solid #221F20",
              fontSize: "16px",
              color: "#221F20",
              height: "38px",
              width: "240px",
            }}
          />
        </div>

        <WrapperNameProductList>Bộ sưu tập nữ</WrapperNameProductList>
        <WrapperProducts></WrapperProducts>
        <div
          style={{
            marginTop: "15px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <WrapperButtonMore
            textButton="Xem tất cả"
            type="outline"
            styleButton={{
              backgroundColor: "#fff",
              border: "1px  solid #221F20",
              fontSize: "16px",
              color: "#221F20",
              height: "38px",
              width: "240px",
            }}
          />
        </div>

        <WrapperNameProductList>Bộ sưu tập trẻ em</WrapperNameProductList>
        <WrapperProducts></WrapperProducts>
        <div
          style={{
            marginTop: "15px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <WrapperButtonMore
            textButton="Xem tất cả"
            type="outline"
            styleButton={{
              backgroundColor: "#fff",
              border: "1px  solid #221F20",
              fontSize: "16px",
              color: "#221F20",
              height: "38px",
              width: "240px",
              marginBottom: "30px",
            }}
          />
        </div>
      </div>
    </>
  );
};

export default HomePage;
