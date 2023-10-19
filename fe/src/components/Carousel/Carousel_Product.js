// the h3,card { image,dien tich, price,title,button save} and add slick
import React, { useRef } from 'react';
import { Card } from 'antd';
import Slider from "react-slick";
import { useNavigate } from 'react-router-dom';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './Carousel_Product.scss';
import { Link, NavLink } from 'react-router-dom';
import {
    HomeOutlined,
    DollarOutlined,
    EnvironmentOutlined
} from '@ant-design/icons';
const CarouselProduct = ({ data }) => {
    const dataSource = data;
    const navigate = useNavigate();
    const { Meta } = Card;
    let settings;
    if (data.length > 5) {
        settings = {
            infinite: true,
            speed: 500,
            slidesToShow: 5,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2000,
        };

    }
    else {
        settings = {
            unslick: true,
        }
    }
    const Checkclick = () => {
        var element = document.getElementById("icon-favorite");
        console.log(element.className === "bi-heart");
        if (element.className === "bi-heart") {
            element.className = "bi-heart-fill";
        }
        else {
            element.className = "bi-heart";
        }
    }
    return (
        <div className="product-list">

            <Slider {...settings}>
                {dataSource?.map((post) => {
                    return (
                        <div className='Card'>
                            <Card
                                hoverable
                                style={{
                                    width: '95%',
                                    minHeight: '480px'
                                }}
                                cover={<img alt="example" src={post.images[0]} />}
                            >
                                <div className='d-flex flex-column gap-2'>
                                    <h6 className='d-flex gap-2'>
                                        <NavLink to={`/detail/${post._id}`} className='login' style={{ color: 'Black' }} >
                                            <HomeOutlined />
                                            {post.title}
                                        </NavLink>
                                    </h6>
                                    <p className='d-flex gap-2'><DollarOutlined />{post.price}</p>
                                    <p className='d-flex gap-2'><EnvironmentOutlined />{post.address}</p>
                                </div>
                                <button className='btn-favorite d-flex mb-3 me-4' onClick={Checkclick}><i className="bi-heart" id='icon-favorite'> Save</i></button>
                            </Card>
                        </div>
                    );
                })}
            </Slider>
        </div>
    );
}
export default CarouselProduct;