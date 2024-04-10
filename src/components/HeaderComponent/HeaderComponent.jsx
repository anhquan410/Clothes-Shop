import React from 'react'
import {Col, Badge} from 'antd'
import { 
  WrapperHeader, 
  WrapperTextHeader, 
  WrapperHeaderAccount,
  WrapperTextHeaderSmall
} from './style'
import {
  UserOutlined, 
  CaretDownOutlined,
  ShoppingCartOutlined
} from '@ant-design/icons';
import ButtonInputSearch from '../ButtonInputSearch/ButtonInputSearch';

const HeaderComponent = () => {
  return (
    <div>
      <WrapperHeader>
      <Col span={6}>
        <WrapperTextHeader>Pistol Store</WrapperTextHeader>
      </Col>
      <Col span={12}>
      <ButtonInputSearch
        size = 'large'
        textButton = 'Tìm kiếm'
        placeholder = 'Tìm sản phẩm, thương hiệu'
      ></ButtonInputSearch>
      </Col>
      <Col span={6} style={{display: 'flex', gap:'20px'}}>
        <WrapperHeaderAccount>
          <UserOutlined style={{fontSize: '25px', paddingLeft: '10px', paddingBottom: '5px'}}/>
          <div>
            <WrapperTextHeaderSmall>Đăng nhập/Đăng ký</WrapperTextHeaderSmall>
            <div>
              <WrapperTextHeaderSmall>Tài khoản</WrapperTextHeaderSmall>
              <CaretDownOutlined />
            </div>
          </div>
        </WrapperHeaderAccount>
        <div style={{marginTop: '5px'}}>
          <Badge count={4} size='small'>
            <ShoppingCartOutlined style={{fontSize: '25px', color: '#fff', padding: '0px 5px 0px 15px'}}/>
          </Badge>
          <WrapperTextHeaderSmall>Giỏ hàng</WrapperTextHeaderSmall>
        </div>
      </Col>
    </WrapperHeader>
    </div>
  )
}

export default HeaderComponent