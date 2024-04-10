import React from 'react'
import {Input} from 'antd'

const InputComponent = ({size,placeholder,...rests}) => {
  return (
        <Input 
            style={{border: 'none'}} 
            size={size} 
            placeholder={placeholder} 
            {...rests}
        />
  )
}

export default InputComponent