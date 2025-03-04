import { Upload } from "antd";
import styled from "styled-components";

export const WrapperHeader = styled.h1`
  color: #000;
  font-size: 18px;
`;

export const WrapperContentProfile = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px, solid, #ccc;
  width: 700px;
  margin: 0 auto;
  padding: 30px;
  border-radius: 10px;
  gap: 30px;
`;

export const WrapperLabel = styled.label`
  color: #000;
  font-size: 16px;
  font-weight: 600;
  line-height: 30px;
  width: 60px;
  text-align: left;
`;

export const WrapperInput = styled.label`
  display: flex;
  align_items: center;
  gap: 20px;
`;

export const WrapperUploadFile = styled(Upload)`
  & .ant-upload.ant-upload-select.ant-upload-select-picture-card {
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }
  & ant-upload-list-item-info {
    display: none;
  }
`;
