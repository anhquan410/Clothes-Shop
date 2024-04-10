import React from 'react'
import { WrapperContent, WrapperLabelText, WrapperTextPrice, WrapperTextValue } from './style'
import { Checkbox, Rate} from 'antd';

const NavbarComponent = () => {
    const onChange = () =>{

    }
    const renderContent = (type,options)=>{
        switch(type){
            case 'text':
                return options.map((option)=>{
                    return (
                        <WrapperTextValue>{option}</WrapperTextValue>
                    )
                })
            case 'checkbox':
                return (
                    <Checkbox.Group style={{ width: '100%', display:'flex', flexDirection:'column'}} onChange={onChange}>   
                        {options.map((option)=>{
                            return (
                                <Checkbox value={option.value}>{option.label}</Checkbox>
                            )
                        })}  
                    </Checkbox.Group>
                )
            case 'star':
                return options.map((option)=>{
                    return (
                        <div style={{display:'flex', gap:'15px'}}>
                            <Rate style={{fontSize:'15px'}} disabled defaultValue={option} />
                            <span style={{color:'#a8a9ad'}}>{`từ ${option} sao`}</span>
                        </div>
                    )
                })
            case 'price':
                return options.map((option)=>{
                    return (
                        <WrapperTextPrice>{option}</WrapperTextPrice>
                    )
                })
            default:
                return{}
        }
    }
  
    return (
        <div>
            <WrapperLabelText>Label</WrapperLabelText>
            <WrapperContent>
                {renderContent('text',['Nữ','Nam','Trẻ em'])}
            </WrapperContent>
            
            
        </div>
  )
}

export default NavbarComponent