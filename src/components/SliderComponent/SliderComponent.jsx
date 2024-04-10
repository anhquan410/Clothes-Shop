import React from "react";
import Slider from 'react-slick'
import {Image} from 'antd'

const SliderComponent = ({arrImages}) => {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplaySpeed: 1500,
        autoplay: true,
    };
    return (
        <Slider {...settings}>
            {arrImages.map((image)=>{
                return (
                    <Image 
                        src={image} 
                        alt="slider" 
                        preview={false}
                    />
                )
            })}
        </Slider>
    )
}

export default SliderComponent