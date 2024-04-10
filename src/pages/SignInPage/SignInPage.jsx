import React from 'react'
import { WrapperDiscriptionSignIn, WrapperFormOption, WrapperSignInForm, WrapperTitleSignIn } from './style'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'

const SignInPage = () => {
  return (  
    <WrapperSignInForm >
      <WrapperTitleSignIn>Bạn đã có tài khoản</WrapperTitleSignIn>
      <div>
        <WrapperDiscriptionSignIn>Nếu bạn đã có tài khoản, hãy đăng nhập để tích lũy điểm thành viên và nhận được những ưu đãi tốt hơn</WrapperDiscriptionSignIn>
        <form >
          <div className='account-name' style={{margin:'1rem 0'}}>
            <input style={{width:'100%',height:'30px'}} type="text" placeholder='Email/SĐT'/>
          </div>
          <div className='account-password' style={{margin:'1rem 0'}}>
            <input style={{width:'100%',height:'30px'}} type="password" placeholder='Mật khẩu'/>
          </div>
          <WrapperFormOption className='form-option'>
            <div className='form-checkbox'>
              <label style={{display:'flex',minHeight:'20px'}}>
                <input type="checkbox"/>
                <span style={{
                  marginLeft:'5px',
                  display:'flex',
                  alignItems:'center',
                  minHeight:'20px'
                }}>Ghi nhớ đăng nhập</span>  
              </label>
            </div>
            <a style={{
              color:'#221f20',
              fontSize:'14px',
              lineHeight:'16px',
              textDecoration:'underline'
            }} href='123'>Quên mật khẩu</a>
          </WrapperFormOption>
          <ButtonComponent 
            size='large'
            styleButton={{
                backgroundColor:'#221f20',
                color:'#f7f8f9',
                border:'1px solid transparent',
                marginTop:'15px',
                width: '100%',
                height:'45px'
            }} 
            textButton='Đăng nhập'
          />
        </form>
        <ButtonComponent 
            size='large'
            styleButton={{
                backgroundColor:'#221f20',
                color:'#f7f8f9',
                border:'1px solid transparent',
                marginTop:'15px',
                width: '100%',
                height:'45px'
            }} 
            textButton='Đăng ký'
          />
      </div>
    </WrapperSignInForm>    
  )
}

export default SignInPage