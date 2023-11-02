import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import "./Login.scss"
import { AiFillGoogleCircle } from 'react-icons/ai'
import { useNavigate, Outlet, NavLink, useParams, redirect } from 'react-router-dom';
import { login } from '../../services/auth.service';
import { UserContext } from '../../App';
import { useContext, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';

const Login = () => {
    const nav = useNavigate();

    // Xử lý submit form
    const handleSubmit = async (values, { setFieldError }) => {
        const data = {
            ...values,
        }

        try {
            const res = await login(data.email, data.password,);
            if(res.data.status === true){
                toast.success(`Chào mừng ${res.data.lastname}`)
                if(res.data.admin === true){
                    nav("/admin/post");
                }else{
                    nav("/");
                }
            }else{
                toast.warning(`Tài khoản của bạn đã bị khóa`)
            }

        } catch (error) {
            if (error.response && error.response.data && error.response.data.error) {
                // Lấy thông báo lỗi từ phía backend
                const errorMessage = error.response.data.error;
                // Xác định xem lỗi là do trường email hay password
                if (errorMessage.includes('email')) {
                    // Đặt thông báo lỗi cho trường email
                    setFieldError('email', errorMessage);
                } else if (errorMessage.includes('password')) {
                    // Đặt thông báo lỗi cho trường password
                    setFieldError('password', errorMessage);

                }
            }
        }


    };


    // Xác thực dữ liệu
    const validate = (values) => {
        const errors = {};

        if (!values.email) {
            errors.email = 'email can not be blank';
        }


        if (!values.password) {
            errors.password = 'password can not be blank';
        }

        return errors;
    };
    const fieldStyle = {
        // margin: '10px',
        // padding: '5px',
    };
    return (

        <div className="container-fluid login_container mt-5 ">
            <div className="row justify-content-center">

                <div className="col-md-4 col-6  mt-5 text-center login-form card"

                >
                    <h1 style={{ color: '#FFBB5C' }}>Login</h1>
                    <Formik
                        initialValues={
                            {
                                email: '',
                                password: ''
                            }
                        }
                        validate={validate}
                        onSubmit={handleSubmit}
                    >
                        <Form style={fieldStyle}
                            className='card-body '>
                            <div className='my-3'>
                                <Field type="email"
                                    name="email"
                                    placeholder="Input your email"
                                    className="form-control form-control-lg field-input" />
                                <h5><ErrorMessage style={{ color: 'red' }} name="email" component="div" /> </h5>
                            </div>
                            <div className='my-3'>
                                <Field type="password"
                                    name="password"
                                    className="form-control form-control-lg field-input"
                                    placeholder="Input your password"


                                />
                                <h5><ErrorMessage style={{ color: 'red' }} name="password" component="div" /> </h5>

                            </div>

                            <div className=" justify-content-center text-center mt-3 ">
                                <button
                                    className=' w-100 my-2 col-md-11 btn btn-light btn-lg btn-Login m-control-lg '
                                    type="submit">Login</button>
                            </div>

                            <div className=" justify-content-center text-center mb-3 ">
                                <button
                                    className='w-100 col-md-11 btn btn-light btn-lg btn-Login m-control-lg '
                                    type="submit"> <AiFillGoogleCircle style={{ fontSize: '29px' }} /> Login with google</button>
                            </div>
                            <h6 className="my-1 text-end">
                                <NavLink to={`/register`} style={{ color: '#e25e3e' }}>forgot your password</NavLink>

                            </h6>
                            <div className="my-3">
                                <p className="font-semibold text-center text-gray-600 text-xl ">
                                    Don’t have an account?
                                </p>
                                <h5 className="font-semibold text-gray-900 text-xl tracking-[-0.40px] w-auto">
                                    <NavLink to={`/register`} style={{ color: '#e25e3e' }}>  Create Account</NavLink>
                                </h5>
                            </div>

                        </Form>
                    </Formik>
                </div>
            </div>


        </div>
    );
}

export default Login