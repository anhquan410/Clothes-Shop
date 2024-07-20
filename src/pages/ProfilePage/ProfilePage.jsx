import React, { useEffect, useState } from "react";
import {
  WrapperContentProfile,
  WrapperHeader,
  WrapperInput,
  WrapperLabel,
  WrapperUploadFile,
} from "./style";
import InputForm from "./../../components/InputForm/InputForm";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { useDispatch, useSelector } from "react-redux";
import * as UserService from "../../services/UserService";
import { useMutationHooks } from "../../hooks/useMutationHook";
import Loading from "../../components/LoadingComponent/Loading";
import * as message from "../../components/MessageComponent/Message";
import { updateUser } from "../../redux/slides/userSlide";
import { Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { getBase64 } from "../../utils";

const ProfilePage = () => {
  const user = useSelector((state) => state.user);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [avatar, setAvatar] = useState("");
  const mutation = useMutationHooks((data) => {
    const { id, ...rests } = data;
    UserService.updateUser(id, rests);
  });
  const dispatch = useDispatch();
  const { data, isPending, isSuccess, isError } = mutation;

  useEffect(() => {
    setName(user?.name);
    setEmail(user?.email);
    setPhone(user?.phone);
    setAddress(user?.address);
    setAvatar(user?.avatar);
  }, [user]);

  useEffect(() => {
    if (isSuccess) {
      message.success();
      handleGetDetailsUser(user?.id, user?.access_token);
    } else if (isError) {
      message.error();
    }
  }, [isSuccess, isError]);

  const handleGetDetailsUser = async (id, token) => {
    const res = await UserService.getDetailsUser(id, token);
    dispatch(updateUser({ ...res?.data, access_token: token }));
  };

  const handleOnChangeName = (value) => {
    setName(value);
  };
  const handleOnChangeEmail = (value) => {
    setEmail(value);
  };
  const handleOnChangeAddress = (value) => {
    setAddress(value);
  };
  const handleOnChangePhone = (value) => {
    setPhone(value);
  };
  const handleOnChangeAvatar = async ({ fileList }) => {
    const file = fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setAvatar(file.preview);
  };

  const handleUpdate = () => {
    mutation.mutate({ id: user?.id, name, email, phone, address, avatar });
  };

  return (
    <div style={{ padding: "20px 120px", height: "800px" }}>
      <WrapperHeader>Thông tin người dùng</WrapperHeader>
      <Loading isLoading={isPending}>
        <WrapperContentProfile>
          <WrapperInput>
            <WrapperLabel htmlFor="name">Name</WrapperLabel>
            <InputForm
              style={{ width: "600px" }}
              id="name"
              value={name}
              onChange={handleOnChangeName}
            />
            <ButtonComponent
              onClick={handleUpdate}
              size="large"
              styleButton={{
                marginRight: "10px",
                width: "fit-content",
                height: "32px",
                padding: "3px 6px",
                fontSize: "16px",
              }}
              textButton="cập nhật"
            />
          </WrapperInput>
          <WrapperInput>
            <WrapperLabel htmlFor="email">Email</WrapperLabel>
            <InputForm
              style={{ width: "600px" }}
              id="email"
              value={email}
              onChange={handleOnChangeEmail}
            />
            <ButtonComponent
              onClick={handleUpdate}
              size="large"
              styleButton={{
                marginRight: "10px",
                width: "fit-content",
                height: "32px",
                padding: "3px 6px",
                fontSize: "16px",
              }}
              textButton="cập nhật"
            />
          </WrapperInput>
          <WrapperInput>
            <WrapperLabel htmlFor="phone">Phone</WrapperLabel>
            <InputForm
              style={{ width: "600px" }}
              id="phone"
              value={phone}
              onChange={handleOnChangePhone}
            />
            <ButtonComponent
              onClick={handleUpdate}
              size="large"
              styleButton={{
                marginRight: "10px",
                width: "fit-content",
                height: "32px",
                padding: "3px 6px",
                fontSize: "16px",
              }}
              textButton="cập nhật"
            />
          </WrapperInput>
          <WrapperInput>
            <WrapperLabel htmlFor="address">Address</WrapperLabel>
            <InputForm
              style={{ width: "600px" }}
              id="address"
              value={address}
              onChange={handleOnChangeAddress}
            />
            <ButtonComponent
              onClick={handleUpdate}
              size="large"
              styleButton={{
                marginRight: "10px",
                width: "fit-content",
                height: "32px",
                padding: "3px 6px",
                fontSize: "16px",
              }}
              textButton="cập nhật"
            />
          </WrapperInput>
          <WrapperInput>
            <WrapperLabel htmlFor="avatar">Avatar</WrapperLabel>
            <WrapperUploadFile onChange={handleOnChangeAvatar} maxCount={1}>
              <Button icon={<UploadOutlined />}>Upload</Button>
            </WrapperUploadFile>
            {avatar && (
              <img
                src={avatar}
                style={{
                  height: "60px",
                  width: "60px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
                alt="avatar"
              />
            )}
            <ButtonComponent
              onClick={handleUpdate}
              size="large"
              styleButton={{
                marginRight: "10px",
                width: "fit-content",
                height: "32px",
                padding: "3px 6px",
                fontSize: "16px",
              }}
              textButton="cập nhật"
            />
          </WrapperInput>
        </WrapperContentProfile>
      </Loading>
    </div>
  );
};

export default ProfilePage;
