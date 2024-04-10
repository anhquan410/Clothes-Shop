import React from 'react'
import { WrapperFooter, WrapperHotline, WrapperTitleFooter, WrapperUlFooter } from './style'
import {Col} from 'antd'
import appstore from '../../assets/images/appstore.png'
import ggplay from '../../assets/images/googleplay.png'


const FooterComponent = () => {
  return (
    <WrapperFooter >
        <Col span={7} style={{height:'450px'}}>
            <WrapperTitleFooter>Pistol Shop</WrapperTitleFooter>
            <div style={{fontSize:'16px',color:'#57585A'}}>
                <div >
                    <p>Công ty Cổ phần Dự Kim với số đăng ký kinh doanh: 0105777650</p>
                    <p>
                        <strong>Địa chỉ đăng ký:</strong>
                        Tổ dân phố Tháp, P.Đại Mỗ, Q.Nam Từ Liêm, TP.Hà Nội, Việt Nam
                    </p>
                    <p>
                        <strong>Số điện thoại:</strong>
                        0243 205 2222/ 090 567 8901
                    </p>
                    <p>
                        <strong>Email:</strong>
                        cskh@pistol.com.vn
                    </p>
                </div>
                <ul >
                    <li>Facebook</li>
                    <li>Instagram</li>
                    <li>Pistol.com</li>
                    <li>Youtube</li>
                </ul>
                <WrapperHotline>
                    <a style={{color:'#fff'}} href="tel:0123456789">Hot line: 0123456789</a>
                </WrapperHotline>
            </div>
        </Col>
        <Col span={3} style={{height:'450px'}}>
            <WrapperTitleFooter>Giới thiệu</WrapperTitleFooter>          
            <WrapperUlFooter >
                <li>Về Pistol Shop</li>
                <li>Tuyển dụng</li>
                <li>Hệ thống cửa hàng</li>
            </WrapperUlFooter>      
        </Col>
        <Col span={4} style={{height:'450px'}}>
            <WrapperTitleFooter>Dịch vụ khách hàng</WrapperTitleFooter>
            <WrapperUlFooter >
                <li>Chính sách điều khoản</li>
                <li>Hướng dẫn mua hàng</li>
                <li>Chính sách thanh toán</li>
                <li>Chính sách đổi trả</li>
                <li>Chính sách bảo hành</li>
                <li>Chính sách thẻ thành viên</li>
                <li>Hệ thống cửa hàng</li>
                <li>Q&A</li>
            </WrapperUlFooter>
        </Col>
        <Col span={3} style={{height:'450px',}}>
            <WrapperTitleFooter>Liên hệ</WrapperTitleFooter>
            <WrapperUlFooter >
                <li>Hotline</li>
                <li>Email</li>
                <li>Live Chat</li>
                <li>Messenger</li>
                <li>Liên hệ</li>
            </WrapperUlFooter>
        </Col>
        <Col span={7} style={{height:'450px',textAlign:'center'}}>
            <WrapperTitleFooter>Dowload App</WrapperTitleFooter>
            <ul style={{listStyleType:'none',padding:'0'}}>
                <li>
                    <a href="123">
                        <img src={appstore} alt="" />
                    </a>
                </li>
                <li>
                    <a href="123">
                        <img src={ggplay} alt="" />
                    </a>
                </li>
            </ul>
        </Col>
    </WrapperFooter>
  )
}

export default FooterComponent