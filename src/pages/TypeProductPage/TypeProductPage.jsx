import React from 'react'
import NavbarComponent from '../../NavbarComponent/NavbarComponent'
import CardComponent from '../../components/CardComponent/CardComponent'
import {Row,Col, Pagination} from 'antd'
import { WrapperNavbar, WrapperProducts } from './style'

const TypeProductPage = () => {
    const onChange = ()=>{}
  return (
    <div style={{padding:'0 120px', background:'#efefef'}}>
        <Row style={{flexWrap:'nowrap', paddingTop:'10px'}}>
            <WrapperNavbar span={4} >
                <NavbarComponent/> 
            </WrapperNavbar>
            <Col span={20}>
                <WrapperProducts >
                    <CardComponent/>
                    <CardComponent/>
                    <CardComponent/>
                    <CardComponent/>
                    <CardComponent/>
                    <CardComponent/>
                    <CardComponent/>
                    <CardComponent/>
                </WrapperProducts>
                <Pagination 
                    defaultCurrent={6} 
                    total={10} 
                    onChange={onChange} 
                    style={{textAlign:'center', marginTop:'15px'}}
                />
            </Col>
        </Row>
    </div>
  )
}

export default TypeProductPage