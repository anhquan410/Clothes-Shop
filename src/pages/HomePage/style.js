import styled from "styled-components";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";

export const WrapperTypeProduct = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  justify-content: flex-start;
  border-bottom: 1px solid black;
  height: 44px;
`;

export const WrapperButtonMore = styled(ButtonComponent)`
  &:hover {
    span {
      font-weight: 600;
    }
  }
`;

export const WrapperNameProductList = styled.div`
  text-align: center;
  letter-spacing: 2px;
  text-transform: uppercase;
  font-weight: 600;
  font-size: 30px;
  line-height: 32px;
  color: #221f20;
  margin-top: 70px;
`;

export const WrapperProducts = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 30px;
  flex-wrap: wrap;
`;
