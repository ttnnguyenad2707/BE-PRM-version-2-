import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import "./SignUp.scss"
import { AiFillGoogleCircle } from 'react-icons/ai'
import { useNavigate, Outlet, NavLink, useParams, redirect } from 'react-router-dom';
import { login, register } from '../../services/auth.service';
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
const SignUp = () => {
    const nav = useNavigate();
    // Xử lý submit form
    const handleSubmit = async (values, { setFieldError }) => {
        const data = {
            ...values,
        }
        // console.log("data", data);
        // const token = Cookies.get('accessToken');
        // console.log("cookies : ", token);

        try {
            const res = await register(data.firstName, data.lastName, data.email, data.password);
            // document.cookie = `token=${res.token}`;
            // console.log("Res", res);
            toast.success(res.data.message)
             nav("/login");
            // const cookieValue = res.headers['set-cookie'];

        } catch (error) {
            if (error.response && error.response.data || error.response.data.messages) {
                // Lấy thông báo lỗi từ phía backend
                const errorMessage = error.response.data;
                // Xác định xem lỗi là do trường email hay password
                if (errorMessage.includes('Email')) {
                    // Đặt thông báo lỗi cho trường email
                      setFieldError('email', errorMessage);
                    // toast.error("invalid email")
                } else if (errorMessage.includes('password')) {
                    // Đặt thông báo lỗi cho trường password
                    //  setFieldError('password', errorMessage);
                     setFieldError('password', 'Mật khẩu không hợp lệ. Mật khẩu phải chứa ít nhất một chữ cái thường, một chữ cái hoa và một số.');
                
                }

            }
            console.log("error", error);
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
                    <h1 style={{ color: '#FFBB5C' }}>Register</h1>
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
                                <Field type="text"
                                    name="firstName"
                                    placeholder="Input your First Name"
                                    className="form-control form-control-lg field-input" />
                                {/* <h5><ErrorMessage style={{ color: 'red' }} name="firstname" component="div" /> </h5> */}
                            </div>
                            <div className='my-3'>
                                <Field type="text"
                                    name="lastName"
                                    placeholder="Input your Last Name"
                                    className="form-control form-control-lg field-input" />
                                {/* <h5><ErrorMessage style={{ color: 'red' }} name="lastname" component="div" /> </h5> */}
                            </div>
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
                                    type="submit">Register</button>
                            </div>

                            {/* <div className=" justify-content-center text-center mb-3 ">
                                <button
                                    className='w-100 col-md-11 btn btn-light btn-lg btn-Login m-control-lg '
                                    type="submit"> <AiFillGoogleCircle style={{ fontSize: '29px' }} /> Login with google</button>
                            </div> */}
                            <h6 className="my-1 text-end">
                                <NavLink to={`/register`} style={{ color: '#e25e3e' }}>forgot your password</NavLink>

                            </h6>
                            <div className="my-3">
                                <p className="font-semibold text-center text-gray-600 text-xl ">
                                    Alraeady an account?
                                </p>
                                <h5 className="font-semibold text-gray-900 text-xl tracking-[-0.40px] w-auto">
                                    <NavLink to={`/login`} style={{ color: '#e25e3e' }}>  Login</NavLink>
                                </h5>
                            </div>

                        </Form>
                    </Formik>
                </div>
            </div>


        </div>
    );
}

export default SignUp