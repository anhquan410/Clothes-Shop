import React, { useEffect, useState } from "react";
import {
  WarpperContainerLeft,
  WarpperContainerRight,
  WrapperTextLight,
} from "./style";
import { useNavigate } from "react-router-dom";
import InputForm from "./../../components/InputForm/InputForm";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import imageLogo from "../../assets/images/logo-login.png";
import { Image } from "antd";
import * as UserService from "../../services/UserService";
import { useMutationHooks } from "../../hooks/useMutationHook";
import Loading from "../../components/LoadingComponent/Loading";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { updateUser } from "../../redux/slides/userSlide";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const mutation = useMutationHooks((data) => UserService.loginUser(data));

  const { data, isPending, isSuccess } = mutation;
  useEffect(() => {
    if (isSuccess) {
      navigate("/");
      localStorage.setItem("access_token", JSON.stringify(data?.access_token));
      if (data?.access_token) {
        const decoded = jwtDecode(data?.access_token);
        if (decoded?.id) {
          handleGetDetailsUser(decoded?.id, data?.access_token);
        }
      }
    }
  }, [isSuccess]);

  const handleGetDetailsUser = async (id, token) => {
    const res = await UserService.getDetailsUser(id, token);
    dispatch(updateUser({ ...res?.data, access_token: token }));
  };

  const handleNavigateSigUp = () => {
    navigate("/sign-up");
  };

  const handleOnChangeEmail = (value) => {
    setEmail(value);
  };

  const handleOnChangePassword = (value) => {
    setPassword(value);
  };

  const handleSignIn = () => {
    mutation.mutate({
      email,
      password,
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
            placeholder="Password"
            type="password"
            value={password}
            onChange={handleOnChangePassword}
          />
          {data?.status === "ERR" && (
            <span style={{ color: "red" }}>{data?.message}</span>
          )}
          <Loading isLoading={isPending}>
            <ButtonComponent
              disabled={!email.length || !password.length}
              onClick={handleSignIn}
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
              textButton="Đăng nhập"
            />
          </Loading>
          <p>
            <WrapperTextLight>Quên mật khẩu?</WrapperTextLight>
          </p>
          <p>
            Chưa có tài khoản?{" "}
            <WrapperTextLight onClick={handleNavigateSigUp}>
              Tạo tài khoản
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

export default SignInPage;
