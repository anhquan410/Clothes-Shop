import React from 'react'
import TypeProduct from '../../components/TypeProduct/TypeProduct'
import { WrapperButtonMore, WrapperProducts, WrapperTypeProduct,WrapperNameProductList } from './style'
import SliderComponent from '../../components/SliderComponent/SliderComponent'
import slider1 from '../../assets/images/slider1.jpg'
import slider2 from '../../assets/images/slider2.jpg'
import slider3 from '../../assets/images/slider3.jpg'
import CardComponent from '../../components/CardComponent/CardComponent'

const HomePage = () => {
  const arr = ['Nam', 'Nữ','Trẻ em']
  return (
    <>
      <div style={{padding: '0 120px'}}>
        <WrapperTypeProduct>
          {arr.map((item)=>{
            return (
              <TypeProduct name={item} key={item}/>
            )
          })}
        </WrapperTypeProduct>
      </div>
      <div id='container' style={{padding:'0 120px', backgroundColor:'#efefef'}}>
        <SliderComponent arrImages={[slider1,slider2,slider3]}/>
        <WrapperNameProductList>Bộ sưu tập nam</WrapperNameProductList>
        <WrapperProducts >
          <CardComponent/>
          <CardComponent/>
          <CardComponent/>
          <CardComponent/>
          <CardComponent/>
          <CardComponent/>
        </WrapperProducts>
        <div style={{marginTop: '15px', display:'flex', justifyContent:'center'}}>
          <WrapperButtonMore 
            textButton='Xem tất cả' 
            type='outline'
            styleButton={{
              backgroundColor:'#fff',
              border: '1px  solid #221F20',
              fontSize: '16px',
              color: '#221F20',
              height: '38px',
              width: '240px',
            }} 
            />
        </div>
        
        <WrapperNameProductList>Bộ sưu tập nữ</WrapperNameProductList>
        <WrapperProducts >
          <CardComponent/>
          <CardComponent/>
          <CardComponent/>
          <CardComponent/>
          <CardComponent/>
          <CardComponent/>
        </WrapperProducts>
        <div style={{marginTop: '15px', display:'flex', justifyContent:'center'}}>
          <WrapperButtonMore 
            textButton='Xem tất cả' 
            type='outline'
            styleButton={{
              backgroundColor:'#fff',
              border: '1px  solid #221F20',
              fontSize: '16px',
              color: '#221F20',
              height: '38px',
              width: '240px',
            }} 
            />
        </div>

        <WrapperNameProductList>Bộ sưu tập trẻ em</WrapperNameProductList>
        <WrapperProducts >
          <CardComponent/>
          <CardComponent/>
          <CardComponent/>
          <CardComponent/>
          <CardComponent/>
          <CardComponent/>
        </WrapperProducts>
        <div style={{marginTop: '15px', display:'flex', justifyContent:'center'}}>
          <WrapperButtonMore 
            textButton='Xem tất cả' 
            type='outline'
            styleButton={{
              backgroundColor:'#fff',
              border: '1px  solid #221F20',
              fontSize: '16px',
              color: '#221F20',
              height: '38px',
              width: '240px',
              marginBottom: '30px'
            }} 
            />
        </div>
      </div>
      
    </>
  )
}

export default HomePage
