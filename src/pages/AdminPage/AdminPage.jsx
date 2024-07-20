import { Menu } from "antd";
import React, { useState } from "react";
import { UserOutlined, AppstoreOutlined } from "@ant-design/icons";
import AdminUser from "./../../components/AdminUser/AdminUser";
import AdminProduct from "./../../components/AdminProduct/AdminProduct";

const AdminPage = () => {
  const items = [
    {
      key: "user",
      label: "Người dùng",
      icon: <UserOutlined />,
    },
    {
      key: "product",
      label: "Sản phẩm",
      icon: <AppstoreOutlined />,
    },
  ];
  const [keySelected, setKeySelected] = useState("1");
  const renderPage = (key) => {
    switch (key) {
      case "user":
        return <AdminUser />;
      case "product":
        return <AdminProduct />;
      default:
        break;
    }
  };
  const handleOnClick = ({ key }) => {
    setKeySelected(key);
  };
  return (
    <div style={{ display: "flex" }}>
      <Menu
        onClick={handleOnClick}
        style={{
          width: 256,
          boxShadow: "1px 1px 2px #ccc",
          height: "100vh",
        }}
        defaultOpenKeys={["user"]}
        selectedKeys={[keySelected]}
        mode="inline"
        items={items}
      />
      <div style={{ flex: 1, padding: "20px" }}>{renderPage(keySelected)}</div>
    </div>
  );
};
export default AdminPage;
