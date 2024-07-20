import React, { useEffect } from "react";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { useState } from "react";
import {
  WarpperContainerLeft,
  WarpperContainerRight,
  WrapperTextLight,
} from "../SignInPage/style";
import { Image } from "antd";
import InputForm from "../../components/InputForm/InputForm";
import imageLogo from "../../assets/images/logo-login.png";
import { useNavigate } from "react-router-dom";
import * as UserService from "../../services/UserService";
import { useMutationHooks } from "../../hooks/useMutationHook";
import Loading from "../../components/LoadingComponent/Loading";
import * as message from "../../components/MessageComponent/Message";

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleOnChangeEmail = (value) => {
    setEmail(value);
  };

  const handleOnChangePassword = (value) => {
    setPassword(value);
  };

  const handleOnChangeConfirmPassword = (value) => {
    setConfirmPassword(value);
  };

  const mutation = useMutationHooks((data) => UserService.signUpUser(data));
  const { data, isPending, isSuccess, isError } = mutation;
  useEffect(() => {
    if (isSuccess) {
      message.success();
      handleNavigateSignIn();
    } else if (isError) {
      message.error();
    }
  }, [isSuccess, isError]);

  const navigate = useNavigate();
  const handleNavigateSignIn = () => {
    navigate("/sign-in");
  };

  const handleSignUp = () => {
    mutation.mutate({
      email,
      password,
      confirmPassword,
    });
  };
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0,0,0,0.53)",
        height: "100vh",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "800px",
          height: "450px",
          background: "#fff",
        }}
      >
        <WarpperContainerLeft>
          <h1>Xin chào</h1>
          <p>Đăng nhập và tạo tài khoản</p>
          <InputForm
            style={{ marginBottom: "10px" }}
            placeholder="Abc@gmail.com"
            value={email}
            onChange={handleOnChangeEmail}
          />
          <InputForm
            style={{ marginBottom: "10px" }}
            placeholder="Password"
            type="password"
            value={password}
            onChange={handleOnChangePassword}
          />

          <InputForm
            placeholder="Confirm password"
            type="password"
            value={confirmPassword}
            onChange={handleOnChangeConfirmPassword}
          />
          {data?.status === "ERR" && (
            <span style={{ color: "red" }}>{data?.message}</span>
          )}
          <Loading isLoading={isPending}>
            <ButtonComponent
              disabled={
                !email.length || !password.length || !confirmPassword.length
              }
              onClick={handleSignUp}
              size="large"
              styleButton={{
                backgroundColor: "#221f20",
                color: "#f7f8f9",
                border: "1px solid transparent",
                marginRight: "10px",
                width: "100%",
                height: "45px",
                margin: "26px 0 10px",
              }}
              textButton={"Đăng ký"}
            />
          </Loading>
          <p>
            Đã có tài khoản?
            <WrapperTextLight
              style={{ marginLeft: "6px" }}
              onClick={handleNavigateSignIn}
            >
              Đăng nhập
            </WrapperTextLight>
          </p>
        </WarpperContainerLeft>
        <WarpperContainerRight>
          <div>
            <Image
              src={imageLogo}
              preview={false}
              alt="image-logo"
              height="203px"
              width="203px"
            ></Image>
            <h4>Mua sắm tại Pistol</h4>
          </div>
        </WarpperContainerRight>
      </div>
    </div>
  );
};

export default SignUpPage;
