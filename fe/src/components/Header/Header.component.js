import React, { useEffect, useState } from 'react';
import { Col, Row, Input, Space, Dropdown, message, Button, Checkbox, Menu } from 'antd';
import Icon, { MessageOutlined, BellOutlined, PlusOutlined, DownOutlined, UnorderedListOutlined, UserOutlined } from '@ant-design/icons';
import Searchbox from '../Searchbox/Searchbox.component.js';
import './header.scss'
import { Link, NavLink } from 'react-router-dom';
import { Outlet, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { checkUser, logout } from '../../services/auth.service.js';
import CreatePostPage from '../../page/CreatePostPage.js';
import axios from 'axios';
/* logo , search space with icon search, icon notifiaction, icon search, link login, link register, button post */

const Headercomponent = () => {
    const token = Cookies.get('accessToken');
    const [user, setUser] = useState(null);
    const [location, setLocation] = useState();
    const navigate = useNavigate()
 
    useEffect(() => {
        if (!token) {
            navigate('/');
            return;
        }


        checkUser(token)
            .then((res) => {

                setUser(res.data);
            })
            .catch((error) => {
                if (error.response && error.response.status === 403) {
                    navigate('/login');
                }
            });

    }, [token, navigate,]);
 

    const [selectedKeys, setSelectedKeys] = useState([]);
    const { Search } = Input;
    const onSearch = (value, _e, info) => console.log(info?.source, value);
    const onClick = ({ key }) => {
        message.info(`Click on item ${key}`);
    };
    const hadlePostCreateButton = () => {
        if (!token) {
            navigate('/login');
            return;
        }
        navigate("/post/create")
    }
    const items = [
        {
            label: 'Danh sách nhà trọ',
            key: '1',
        },
        {
            label: '2nd menu item',
            key: '2',
        },
        {
            label: '3rd menu item',
            key: '3',
        },
    ];
    const handleMenuClick = ({ key }) => {
        setSelectedKeys((prevSelectedKeys) => {
            if (prevSelectedKeys.includes(key)) {
                return prevSelectedKeys.filter((item) => item !== key);
            }
            return [...prevSelectedKeys, key];
        });
    };

    const checkClickItem = (a) => {
        navigate('/search', { state: { listpage: "list page" } });
    }
    const fetchLocation = async () => {
        try {
            const response = await axios.get('https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json');
            const transformedData = response.data.map(item => ({
                title: item.Name,
                value: item.Name,
                children: item.Districts ? item.Districts.map(child => ({
                    title: child.Name,
                    value: child.Name,
                })) : []
            }));

            setLocation(transformedData);
        } catch (error) {
            console.error(error);
        }
    };
    const handleLogout = () => {
        logout();
        Cookies.remove('accessToken');
        navigate("/")
        window.location.reload();
    }

    useEffect(() => {
        fetchLocation();
    }, [])
    return (

        <div className='Body'>
            <div className='position-sticky top-0 start-0 end-0 z-2 background-primary' style={{ padding: '15px 0' }}>
                <Row className='header-container container-fluid justify-content-between ps-5 pe-5'>
                    <div className='d-flex align-item-center gap-1'>
                        <Link to="/" className='fw-bold pe-5' id='logo'>HomeRadar</Link>
                        <button className='btn-list'>
                            <Dropdown
                                menu={{
                                    items,
                                    onClick: (item) => checkClickItem(item),
                                }}
                            >
                                <a onClick={(e) => e.preventDefault()}>
                                    <Space style={{ color: '#E66D4F', fontSize: 'medium', fontWeight: 'bold' }}>
                                        <UnorderedListOutlined style={{ marginRight: '5px', fontSize: '25px' }} />
                                        Danh sách
                                        <DownOutlined />
                                    </Space>
                                </a>
                            </Dropdown>
                        </button>
                    </div>
                    {/* <Col >
                        
                    </Col> */}
                    <div className='d-flex align-items-center gap-5'>
                        <div className='search-box' >
                            <Searchbox datalocation={location} />
                        </div>
                        <button className='btn-bell position-relative'>
                            <BellOutlined style={{ fontSize: '30px', color: '#e25e3e' }} />
                            <p className='number-notification' >1</p>
                            <div className='list-notification'>
                                <div className='notification'>
                                    <p>Hệ thống đang xác nhận yêu cầu của bạn</p>
                                </div>
                                <div className='notification'>
                                    <p>Hệ thống đang xác nhận yêu cầu của bạn</p>
                                </div>
                            </div>
                        </button>
                        <button className='btn-mess position-relative'>
                            <Link to={'/chat'}>abcd</Link>
                            <MessageOutlined style={{ fontSize: '30px', color: '#e25e3e' }} />
                            <p className='number-notification'>1</p>
                        </button>
                        {/* {user ? <a className='login'> {user.lastname}</a> : <a className='login'>Đăng nhập</a>} */}
                        {user && user.lastname ? (
                            <NavLink className='login d-flex flex-column justify-content-center' style={{ color: '#E66D4F' }}>
                                <UserOutlined style={{ color: '#E66D4F', fontSize: '30px' }} />
                                {user.lastname}
                            </NavLink>
                        ) : (
                            <NavLink to="/login" className='login' style={{ color: '#E66D4F' }} >
                                Đăng nhập
                            </NavLink>
                        )}
                        <button className='btn bt-primary p-2 fw-bold' onClick={() => { hadlePostCreateButton() }}><PlusOutlined /> Đăng tin</button>
                        {token && (<Link to='/stored/posted' className='btn bt-primary p-2 fw-bold'>Quản lý tin</Link>)}
                        {token && (<button className='btn bt-primary p-2 fw-bold' onClick={() => { handleLogout() }}><PlusOutlined /> Đăng Xuất</button>)}


                    </div>
                </Row>
            </div>
            <Outlet context={[user, setUser]} />
        </div>
    );
}

export default Headercomponent;