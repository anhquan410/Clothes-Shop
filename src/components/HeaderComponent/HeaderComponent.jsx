import React, { useEffect, useState } from "react";
import { Col, Badge, Popover } from "antd";
import {
  WrapperHeader,
  WrapperTextHeader,
  WrapperHeaderAccount,
  WrapperTextHeaderSmall,
  WrapperContentPopover,
} from "./style";
import {
  UserOutlined,
  CaretDownOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import ButtonInputSearch from "../ButtonInputSearch/ButtonInputSearch";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as UserService from "../../services/UserService";
import { resetUser } from "../../redux/slides/userSlide";
import { searchProduct } from "../../redux/slides/productSlice";

const HeaderComponent = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [userAvatar, setUserAvavar] = useState("");
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const handleNavigateLogin = () => {
    navigate("/sign-in");
  };

  const handleLogout = async () => {
    await UserService.logoutUser;
    dispatch(resetUser);
  };

  useEffect(() => {
    setUserAvavar(user?.avatar);
  }, [user?.avatar]);

  const content = (
    <div>
      <WrapperContentPopover onClick={() => navigate("/profile-user")}>
        Thông tin người dùng
      </WrapperContentPopover>
      <WrapperContentPopover onClick={handleLogout}>
        Đăng xuất
      </WrapperContentPopover>
      {user?.isAdmin && (
        <WrapperContentPopover onClick={() => navigate("/system/admin")}>
          Quản lý hệ thống
        </WrapperContentPopover>
      )}
    </div>
  );
  const onSearch = (e) => {
    setSearch(e.target.value);
    dispatch(searchProduct(e.target.value));
  };
  return (
    <div>
      <WrapperHeader>
        <Col span={5}>
          <WrapperTextHeader>Pistol Store</WrapperTextHeader>
        </Col>
        <Col span={13}>
          <ButtonInputSearch
            size="large"
            textButton="Tìm kiếm"
            placeholder="Tìm sản phẩm, thương hiệu"
            onChange={onSearch}
          ></ButtonInputSearch>
        </Col>
        <Col span={6} style={{ display: "flex", gap: "20px" }}>
          <WrapperHeaderAccount>
            {userAvatar ? (
              <img
                src={userAvatar}
                alt="avatar"
                style={{
                  height: "30px",
                  width: "30px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
            ) : (
              <UserOutlined
                style={{
                  fontSize: "25px",
                  paddingLeft: "10px",
                  paddingBottom: "5px",
                }}
              />
            )}

            {user?.access_token ? (
              <>
                <Popover placement="bottom" content={content} trigger="click">
                  <div style={{ cursor: "pointer" }}>
                    {user?.name?.length ? user?.name : user?.email}
                  </div>
                </Popover>
              </>
            ) : (
              <div onClick={handleNavigateLogin} style={{ cursor: "pointer" }}>
                <WrapperTextHeaderSmall>
                  Đăng nhập/Đăng ký
                </WrapperTextHeaderSmall>
                <div>
                  <WrapperTextHeaderSmall>Tài khoản</WrapperTextHeaderSmall>
                  <CaretDownOutlined />
                </div>
              </div>
            )}
          </WrapperHeaderAccount>
          <div style={{ marginTop: "5px" }}>
            <Badge count={4} size="small">
              <ShoppingCartOutlined
                style={{
                  fontSize: "25px",
                  color: "#fff",
                  padding: "0px 5px 0px 15px",
                }}
              />
            </Badge>
            <WrapperTextHeaderSmall>Giỏ hàng</WrapperTextHeaderSmall>
          </div>
        </Col>
      </WrapperHeader>
    </div>
  );
};

export default HeaderComponent;
