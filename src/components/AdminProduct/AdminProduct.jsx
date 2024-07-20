import React, { useEffect, useState } from "react";
import { WrapperHeader } from "../AdminUser/style";
import { Button, Form, Select } from "antd";
import TableComponent from "../TableComponent/TableComponent";
import { AppstoreAddOutlined } from "@ant-design/icons";
import InputComponent from "../InputComponent/InputComponent";
import {
  UploadOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { getBase64, renderOptions } from "../../utils";
import { WrapperUploadFile } from "./style";
import * as ProductService from "../../services/ProductService";
import { useMutationHooks } from "../../hooks/useMutationHook";
import * as message from "../../components/MessageComponent/Message";
import { useQuery } from "@tanstack/react-query";
import DrawerComponent from "../DrawerComponent/DrawerComponent";
import { useSelector } from "react-redux";
import ModalComponent from "../ModalComponent/ModalComponent";

const AdminProduct = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rowSelected, setRowSelected] = useState("");
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
  const [typeSelect, setTypeSelect] = useState("");
  const user = useSelector((state) => state?.user);
  const [stateProduct, setStateProduct] = useState({
    name: "",
    description: "",
    price: "",
    countInStock: "",
    rating: "",
    image: "",
    type: "",
    newType: "",
  });

  const [stateProductDetails, setStateProductDetails] = useState({
    name: "",
    description: "",
    price: "",
    countInStock: "",
    rating: "",
    image: "",
    type: "",
  });

  const [form] = Form.useForm();
  const mutation = useMutationHooks((data) => {
    const { name, description, price, rating, image, type, countInStock } =
      data;
    const res = ProductService.createProduct({
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
    const res = ProductService.updateProduct(id, { ...rests });
    return res;
  });
  const mutationDeleted = useMutationHooks((data) => {
    const { id } = data;
    const res = ProductService.deleteProduct(id);
    return res;
  });

  const getAllProduct = async () => {
    const res = await ProductService.getAllProduct();
    return res;
  };

  const fetchGetDetailsProduct = async (rowSelected) => {
    const res = await ProductService.getDetailsProduct(rowSelected);
    if (res?.data) {
      setStateProductDetails({
        name: res?.data?.name,
        description: res?.data?.description,
        price: res?.data?.price,
        countInStock: res?.data?.countInStock,
        rating: res?.data?.rating,
        image: res?.data?.image,
        type: res?.data?.type,
      });
    }
    setIsLoadingUpdate(false);
  };

  useEffect(() => {
    form.setFieldsValue(stateProductDetails);
  }, [form, stateProductDetails]);
  useEffect(() => {
    if (rowSelected) {
      fetchGetDetailsProduct(rowSelected);
    }
  }, [rowSelected]);
  const handleDetailsProduct = () => {
    if (rowSelected) {
      setIsLoadingUpdate(true);
      fetchGetDetailsProduct();
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

  const fetchAllTypeProduct = async () => {
    const res = await ProductService.getAllTypeProduct();
    return res;
  };
  const { isPending: isLoadingProduct, data: products } = useQuery({
    queryKey: ["products"],
    queryFn: getAllProduct,
  });
  const typeProduct = useQuery({
    queryKey: ["type-roducts"],
    queryFn: fetchAllTypeProduct,
  });
  const renderAction = () => {
    return (
      <div>
        <DeleteOutlined
          style={{ fontSize: "20px", cursor: "pointer", marginRight: "20px" }}
          onClick={() => setIsModalOpenDelete(true)}
        />
        <EditOutlined
          style={{ fontSize: "20px", cursor: "pointer" }}
          onClick={handleDetailsProduct}
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
      title: "Type",
      dataIndex: "type",
      sorter: (a, b) => a.type.length - b.type.length,
    },
    {
      title: "Rating",
      dataIndex: "rating",
      sorter: (a, b) => a.rating - b.rating,
    },
    {
      title: "Price",
      dataIndex: "price",
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: "Action",
      dataIndex: "action",
      render: renderAction,
    },
  ];
  const dataTable =
    products?.data?.length &&
    products?.data?.map((product) => {
      return { ...product, key: product._id };
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
  const handleDeleteProduct = () => {
    mutationDeleted.mutate({ id: rowSelected });
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setStateProduct({
      name: "",
      description: "",
      price: "",
      countInStock: "",
      rating: "",
      image: "",
      type: "",
    });
    form.resetFields();
  };
  const onFinish = () => {
    const params = {
      name: stateProduct.name,
      price: stateProduct.price,
      description: stateProduct.description,
      rating: stateProduct.rating,
      image: stateProduct.image,
      countInStock: stateProduct.countInStock,
      type:
        stateProduct.type === "add_type"
          ? stateProduct.newType
          : stateProduct.type,
    };
    mutation.mutate(params);
  };

  const handleOnChange = (e) => {
    setStateProduct({
      ...stateProduct,
      [e.target.name]: e.target.value,
    });
  };
  const handleOnChangeDetails = (e) => {
    setStateProductDetails({
      ...stateProductDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnChangeAvatar = async ({ fileList }) => {
    const file = fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setStateProduct({
      ...stateProduct,
      image: file.preview,
    });
  };
  const handleOnChangeAvatarDetails = async ({ fileList }) => {
    const file = fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setStateProduct({
      ...stateProductDetails,
      image: file.preview,
    });
  };
  const onUpdateProduct = () => {
    mutationUpdate.mutate({
      rowSelected,
      token: user?.accessToken,
      stateProductDetails,
    });
  };

  const handleOnChangeSelect = (value) => {
    setStateProduct({
      ...stateProduct,
      type: value,
    });
  };

  return (
    <div>
      <WrapperHeader>Quản lý sản phẩm</WrapperHeader>
      <div
        style={{ marginTop: "10px", marginBottom: "30px" }}
        onClick={() => setIsModalOpen(true)}
      >
        <Button style={{ height: "100px", width: "100px" }}>
          <AppstoreAddOutlined style={{ fontSize: "30px" }} />
        </Button>
      </div>
      <div>
        <TableComponent
          columns={columns}
          data={dataTable}
          isPending={isLoadingProduct}
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
                message: "Please input your product's name!",
              },
            ]}
          >
            <InputComponent
              value={stateProduct.name}
              onChange={handleOnChange}
              name="name"
            />
          </Form.Item>

          <Form.Item
            label="Type"
            name="type"
            rules={[
              {
                required: true,
                message: "Please input your product Type!",
              },
            ]}
          >
            <Select
              name="type"
              value={stateProduct.type}
              onChange={handleOnChangeSelect}
              options={renderOptions(typeProduct?.data?.data)}
            />
          </Form.Item>
          {stateProduct.type === "add_type" && (
            <Form.Item
              label="New type"
              name="newType"
              rules={[
                {
                  required: true,
                  message: "Please input your product Type!",
                },
              ]}
            >
              <InputComponent
                value={stateProduct.newType}
                onChange={handleOnChange}
                name="newType"
              />
            </Form.Item>
          )}

          <Form.Item
            label="Count In Stock"
            name="countInStock"
            rules={[
              {
                required: true,
                message: "Please input your product countInStock!",
              },
            ]}
          >
            <InputComponent
              value={stateProduct.countInStock}
              onChange={handleOnChange}
              name="countInStock"
            />
          </Form.Item>

          <Form.Item
            label="Price"
            name="price"
            rules={[
              {
                required: true,
                message: "Please input your product price!",
              },
            ]}
          >
            <InputComponent
              value={stateProduct.price}
              onChange={handleOnChange}
              name="price"
            />
          </Form.Item>

          <Form.Item
            label="Rating"
            name="rating"
            rules={[
              {
                required: true,
                message: "Please input your product rating!",
              },
            ]}
          >
            <InputComponent
              value={stateProduct.rating}
              onChange={handleOnChange}
              name="rating"
            />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[
              {
                required: true,
                message: "Please input your product description!",
              },
            ]}
          >
            <InputComponent
              value={stateProduct.description}
              onChange={handleOnChange}
              name="description"
            />
          </Form.Item>
          <Form.Item
            label="Image"
            name="image"
            rules={[
              {
                required: true,
                message: "Please input your product image!",
              },
            ]}
          >
            <WrapperUploadFile onChange={handleOnChangeAvatar} maxCount={1}>
              <Button icon={<UploadOutlined />}>Upload</Button>
              {stateProduct?.image && (
                <img
                  src={stateProduct?.image}
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
          onFinish={onUpdateProduct}
          autoComplete="off"
          form={form}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input your product's name!",
              },
            ]}
          >
            <InputComponent
              value={stateProductDetails.name}
              onChange={handleOnChangeDetails}
              name="name"
            />
          </Form.Item>

          <Form.Item
            label="Type"
            name="type"
            rules={[
              {
                required: true,
                message: "Please input your product Type!",
              },
            ]}
          >
            <Select
              name="type"
              options={renderOptions(typeProduct?.data?.data)}
            />
          </Form.Item>

          <Form.Item
            label="Count In Stock"
            name="countInStock"
            rules={[
              {
                required: true,
                message: "Please input your product countInStock!",
              },
            ]}
          >
            <InputComponent
              value={stateProductDetails.countInStock}
              onChange={handleOnChangeDetails}
              name="countInStock"
            />
          </Form.Item>

          <Form.Item
            label="Price"
            name="price"
            rules={[
              {
                required: true,
                message: "Please input your product price!",
              },
            ]}
          >
            <InputComponent
              value={stateProductDetails.price}
              onChange={handleOnChangeDetails}
              name="price"
            />
          </Form.Item>

          <Form.Item
            label="Rating"
            name="rating"
            rules={[
              {
                required: true,
                message: "Please input your product rating!",
              },
            ]}
          >
            <InputComponent
              value={stateProductDetails.rating}
              onChange={handleOnChangeDetails}
              name="rating"
            />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[
              {
                required: true,
                message: "Please input your product description!",
              },
            ]}
          >
            <InputComponent
              value={stateProductDetails.description}
              onChange={handleOnChangeDetails}
              name="description"
            />
          </Form.Item>
          <Form.Item
            label="Image"
            name="image"
            rules={[
              {
                required: true,
                message: "Please input your product image!",
              },
            ]}
          >
            <WrapperUploadFile
              onChange={handleOnChangeAvatarDetails}
              maxCount={1}
            >
              <Button icon={<UploadOutlined />}>Upload</Button>
              {stateProductDetails?.image && (
                <img
                  src={stateProductDetails?.image}
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
        onOk={handleDeleteProduct}
      >
        <div>Bạn có chắc chắn muốn xóa sản phẩm này không?</div>
      </ModalComponent>
    </div>
  );
};

export default AdminProduct;
