import styled from "styled-components";
import { Row } from "antd";

export const WrapperFooter = styled(Row)`
  padding: 10px 120px;
  background-color: #e6e8e6;
  align-items: center;
  gap: 16px;
  flex-wrap: nowrap;
`;

export const WrapperTitleFooter = styled.p`
  font-weight: 600;
  font-size: 24px;
  line-height: 32px;
  color: #221f20;
  margin-bottom: 20px;
`;

export const WrapperHotline = styled.div`
  background: #221f20;
  border-radius: 16px 0px;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  text-transform: uppercase;
  padding: 12px 24px;
  width: 170px;
`;

export const WrapperUlFooter = styled.ul`
  font-size: 16px;
  color: #57585a;
  list-style-type: none;
  padding: 0;
`;
