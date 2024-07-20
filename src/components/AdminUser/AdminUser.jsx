import React, { useEffect, useState } from "react";
import { WrapperHeader, WrapperUploadFile } from "./style";
import { Button, Form } from "antd";
import {
  UserAddOutlined,
  UploadOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import TableComponent from "../TableComponent/TableComponent";
import InputComponent from "../InputComponent/InputComponent";
import ModalComponent from "../ModalComponent/ModalComponent";
import DrawerComponent from "../DrawerComponent/DrawerComponent";
import * as message from "../../components/MessageComponent/Message";
import { useSelector } from "react-redux";
import { getBase64 } from "../../utils";
import { useQuery } from "@tanstack/react-query";
import { useMutationHooks } from "../../hooks/useMutationHook";
import * as UserService from "../../services/UserService";

const AdminUser = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rowSelected, setRowSelected] = useState("");
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
  const user = useSelector((state) => state?.user);
  const [stateUser, setStateUser] = useState({
    name: "",
    email: "",
    phone: "",
    isAdmin: false,
  });

  const [stateUserDetails, setStateUserDetails] = useState({
    name: "",
    email: "",
    phone: "",
    isAdmin: false,
  });

  const [form] = Form.useForm();
  const mutation = useMutationHooks((data) => {
    const { name, description, price, rating, image, type, countInStock } =
      data;
    const res = UserService.signUpUser({
      name,
      description,
      price,
      countInStock,
      rating,
      image,
      type,
    });
    return res;
  });
  const mutationUpdate = useMutationHooks((data) => {
    const { id, ...rests } = data;
    const res = UserService.updateUser(id, { ...rests });
    return res;
  });
  const mutationDeleted = useMutationHooks((data) => {
    const { id } = data;
    const res = UserService.deleteUser(id);
    return res;
  });

  const getAllUser = async () => {
    const res = await UserService.getAllUser();
    return res;
  };

  const fetchGetDetailsUser = async (rowSelected) => {
    const res = await UserService.getDetailsUser(rowSelected);
    if (res?.data) {
      setStateUserDetails({
        name: res?.data?.name,
        email: res?.data?.email,
        phone: res?.data?.phone,
        isAdmin: res?.data?.isAdmin,
      });
    }
    setIsLoadingUpdate(false);
  };

  useEffect(() => {
    form.setFieldsValue(stateUserDetails);
  }, [form, stateUserDetails]);
  useEffect(() => {
    if (rowSelected) {
      fetchGetDetailsUser(rowSelected);
    }
  }, [rowSelected]);
  const handleDetailsUser = () => {
    if (rowSelected) {
      setIsLoadingUpdate(true);
      fetchGetDetailsUser();
    }
    setIsOpenDrawer(true);
  };

  const { data, isSuccess, isError } = mutation;
  const {
    data: dataDeleted,
    isSuccess: isSuccessDeleted,
    isError: isErrorDeleted,
  } = mutationDeleted;
  const {
    data: dataUpdated,
    isSuccess: isSuccessUpdated,
    isError: isErrorUpdated,
  } = mutationUpdate;

  const queryUser = useQuery({
    queryKey: ["user"],
    queryFn: getAllUser,
  });
  const { isPending: isLoadingUser, data: users } = queryUser;
  const renderAction = () => {
    return (
      <div>
        <DeleteOutlined
          style={{ fontSize: "20px", cursor: "pointer", marginRight: "20px" }}
          onClick={() => setIsModalOpenDelete(true)}
        />
        <EditOutlined
          style={{ fontSize: "20px", cursor: "pointer" }}
          onClick={handleDetailsUser}
        />
      </div>
    );
  };
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter: (a, b) => a.email.length - b.email.length,
    },
    {
      title: "Admin",
      dataIndex: "isAdmin",
      filter: [
        {
          text: "True",
          value: true,
        },
        {
          text: "False",
          value: false,
        },
      ],
    },
    {
      title: "Phone",
      dataIndex: "phone",
      sorter: (a, b) => a.phone.length - b.phone.length,
    },
    {
      title: "Action",
      dataIndex: "action",
      render: renderAction,
    },
  ];
  const dataTable =
    users?.data?.length &&
    users?.data?.map((user) => {
      return {
        ...user,
        key: user._id,
        isAdmin: user.isAdmin ? "TRUE" : "FALSE",
      };
    });

  useEffect(() => {
    if (isSuccess && data?.status === "OK") {
      message.success();
      handleCancel();
    } else if (isError) {
      message.error();
    }
  }, [isSuccess, isError]);
  useEffect(() => {
    if (isSuccessDeleted && dataDeleted?.status === "OK") {
      message.success();
      handleCancelDelete();
    } else if (isErrorDeleted) {
      message.error();
    }
  }, [isSuccessDeleted, isErrorDeleted]);

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancelDelete = () => {
    setIsModalOpenDelete(false);
  };
  const handleDeleteUSer = () => {
    mutationDeleted.mutate({ id: rowSelected });
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setStateUser({
      name: "",
      email: "",
      phone: "",
      isAdmin: false,
    });
    form.resetFields();
  };
  const onFinish = () => {
    mutation.mutate(stateUser);
  };

  const handleOnChange = (e) => {
    setStateUser({
      ...stateUser,
      [e.target.name]: e.target.value,
    });
  };
  const handleOnChangeDetails = (e) => {
    setStateUserDetails({
      ...stateUserDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnChangeAvatar = async ({ fileList }) => {
    const file = fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setStateUser({
      ...stateUser,
      image: file.preview,
    });
  };
  const handleOnChangeAvatarDetails = async ({ fileList }) => {
    const file = fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setStateUser({
      ...stateUserDetails,
      image: file.preview,
    });
  };
  const onUpdateUser = () => {
    mutationUpdate.mutate({
      rowSelected,
      token: user?.accessToken,
      stateUserDetails,
    });
  };

  return (
    <div>
      <WrapperHeader>Quản lý người dùng</WrapperHeader>
      <div style={{ marginTop: "10px", marginBottom: "30px" }}>
        <Button style={{ height: "100px", width: "100px" }}>
          <UserAddOutlined style={{ fontSize: "30px" }} />
        </Button>
      </div>
      <div>
        <TableComponent
          columns={columns}
          data={dataTable}
          isPending={isLoadingUser}
          onRow={(record, rowIndex) => {
            return {
              onClick: (event) => {
                setRowSelected(record._id);
              }, // click row
            };
          }}
        />
      </div>
      <ModalComponent
        forceRender
        title="Tạo sản phẩm"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          name="basic"
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 18,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          autoComplete="off"
          form={form}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input your user's name!",
              },
            ]}
          >
            <InputComponent
              value={stateUser.name}
              onChange={handleOnChange}
              name="name"
            />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your user email!",
              },
            ]}
          >
            <InputComponent
              value={stateUser.email}
              onChange={handleOnChange}
              name="email"
            />
          </Form.Item>

          <Form.Item
            label="Phone"
            name="phone"
            rules={[
              {
                required: true,
                message: "Please input your user phone!",
              },
            ]}
          >
            <InputComponent
              value={stateUser.phone}
              onChange={handleOnChange}
              name="phone"
            />
          </Form.Item>

          <Form.Item
            label="Admin"
            name="isAdmin"
            rules={[
              {
                required: true,
                message: "Please input your user isAdmin!",
              },
            ]}
          >
            <InputComponent
              value={stateUser.isAdmin}
              onChange={handleOnChange}
              name="isAdmin"
            />
          </Form.Item>
          {/* <Form.Item
            label="Image"
            name="image"
            rules={[
              {
                required: true,
                message: "Please input your user image!",
              },
            ]}
          >
            <WrapperUploadFile onChange={handleOnChangeAvatar} maxCount={1}>
              <Button icon={<UploadOutlined />}>Upload</Button>
              {stateUser?.image && (
                <img
                  src={stateUser?.image}
                  style={{
                    height: "60px",
                    width: "60px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    marginLeft: "20px",
                  }}
                  alt="avatar"
                />
              )}
            </WrapperUploadFile>
          </Form.Item> */}

          <Form.Item
            wrapperCol={{
              offset: 20,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </ModalComponent>
      <DrawerComponent
        title="Chi tiết sản phẩm"
        isOpen={isOpenDrawer}
        onClose={() => setIsOpenDrawer(false)}
        width="40%"
      >
        <Form
          name="basic"
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 18,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onUpdateUser}
          autoComplete="off"
          form={form}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input your user's name!",
              },
            ]}
          >
            <InputComponent
              value={stateUserDetails.name}
              onChange={handleOnChangeDetails}
              name="name"
            />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your user email!",
              },
            ]}
          >
            <InputComponent
              value={stateUserDetails.email}
              onChange={handleOnChangeDetails}
              name="email"
            />
          </Form.Item>

          <Form.Item
            label="Phone"
            name="phone"
            rules={[
              {
                required: true,
                message: "Please input your user phone!",
              },
            ]}
          >
            <InputComponent
              value={stateUserDetails.phone}
              onChange={handleOnChangeDetails}
              name="phone"
            />
          </Form.Item>

          <Form.Item
            label="Admin"
            name="isAdmin"
            rules={[
              {
                required: true,
                message: "Please input your user isAdmin!",
              },
            ]}
          >
            <InputComponent
              value={stateUserDetails.isAdmin}
              onChange={handleOnChangeDetails}
              name="isAdmin"
            />
          </Form.Item>

          <Form.Item
            label="Image"
            name="image"
            rules={[
              {
                required: true,
                message: "Please input your user image!",
              },
            ]}
          >
            <WrapperUploadFile
              onChange={handleOnChangeAvatarDetails}
              maxCount={1}
            >
              <Button icon={<UploadOutlined />}>Upload</Button>
              {stateUserDetails?.image && (
                <img
                  src={stateUserDetails?.image}
                  style={{
                    height: "60px",
                    width: "60px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    marginLeft: "20px",
                  }}
                  alt="avatar"
                />
              )}
            </WrapperUploadFile>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 20,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Apply
            </Button>
          </Form.Item>
        </Form>
      </DrawerComponent>
      <ModalComponent
        forceRender
        title="Xóa sản phẩm"
        open={isModalOpenDelete}
        onCancel={handleCancelDelete}
        onOk={handleDeleteUSer}
      >
        <div>Bạn có chắc chắn muốn xóa người dùng này không?</div>
      </ModalComponent>
    </div>
  );
};

export default AdminUser;
