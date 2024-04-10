import React from 'react'
import {Card} from 'antd'
import { StyleNameProduct, WrapperDiscountText, WrapperPriceText, WrapperReportText } from './style'
import {StarFilled} from '@ant-design/icons';

const CardComponent = () => {
  return (
    <Card
        hoverable
        style={{ width: 240 }}
        cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
    >
       <StyleNameProduct>Chân váy xẻ gấu trước</StyleNameProduct>
       <WrapperReportText>
            <span>5</span>
            <StarFilled style={{fontSize:'10px', color:'yellow'}} />
            <span> | Đã bán 100+</span>
        </WrapperReportText> 
        <WrapperPriceText>
            <span>289.000đ</span>
            <WrapperDiscountText>890.000đ</WrapperDiscountText>
        </WrapperPriceText>
    </Card>
  )
}

export default CardComponent