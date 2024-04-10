import styled from "styled-components";
import { Image, Row } from "antd";

export const WrapperStyleImgSmall = styled(Image)`
  height: 64px;
  width: 64px;
`;

export const WrapperStyleColImage = styled(Row)`
  display: flex;
  flex-basis: unset;
`;

export const WrapperStyleNameProduct = styled.h1`
  font-weight: 600;
  font-size: 30px;
  line-height: 32px;
  color: #221f20;
`;

export const WrapperStyleInforProduct = styled.div`
  margin-top: 16px;
  display: flex;
  align-items: center;
  white-space: nowrap;
  font-size: 16px;
  line-height: 24px;
  color: #6c6d70;
`;

export const WrapperPriceProduct = styled.div`
  margin-top: 35px;
  position: relative;
  display: inline-block;
`;
export const WrapperPriceSale = styled.div`
  background-color: #dc633a;
  font-size: 14px;
  line-height: 16px;
  font-weight: 600;
  color: #f7f8f9;
  position: absolute;
  left: calc(100% + 10px);
  top: -20%;
  padding: 4px 8px;
  min-width: 40px;
`;

export const WrapperAdderssProduct = styled.div`
  span.address {
    text-decoration: underline;
    font-size: 15px;
    line-height: 24px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 0 10px;
  }
  ,
  span.change-address {
    color: rgb(11, 116, 229);
    font-size: 16px;
    line-height: 24px;
    font-height: 500;
  }
`;

export const WrapperQualityProduct = styled.div`
  margin-top: 30px;
  margin-bottom: 40px;
  font-size: 16px;
`;
