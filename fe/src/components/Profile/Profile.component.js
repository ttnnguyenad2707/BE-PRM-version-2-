import React, { useEffect, useState } from 'react'
import "./Profile.scss"
import 'bootstrap/dist/css/bootstrap.css';
import images from '../../assets/images';
import { Link, useOutletContext } from 'react-router-dom';
import { AiOutlinePlus, AiFillDelete, AiFillEdit, AiOutlineLoading3Quarters } from 'react-icons/ai'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import * as Yup from 'yup';
const Profile = () => {
    console.log(images.avatarDefault);
    const [user] = useOutletContext();
    console.log("render", user);

    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        if (user) {
            setIsLoading(false);
        }
    }, [user]);
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const validationSchema = Yup.object().shape({
        firstname: Yup.string().required('first name can not be blank'),
        lastname: Yup.string().required('last name can not be blank'),
        email: Yup.string().matches(emailRegex, 'Invalid email').required('Required'),
        phone: Yup.string()
            .matches(/^\d{10,11}$/, 'The phone number must have 10 to 11 digits')
            .nullable(),
        // Các quy tắc cho các trường dữ liệu khác
    });
    const handleSubmitForm = async (values) => {
        try {
            
        } catch (error) {
            
        }
        console.log("values", values);

    }
    return (
        <>
            {isLoading ? (
                <div className="text-center">
                    <AiOutlineLoading3Quarters className="loading-icon" />
                    <p>Loading...</p>
                </div>
            ) : (
                <div className='component component-profile bg-F4F4F4'>
                    <div className='container'>
                        <div className='row gap-3'>
                            <div className='col-md-3 bg-light h-fit-content'>
                                <div className='sidebar'>
                                    <div className='sidebar-title'>Thông tin cá nhân</div>
                                    <div className='sidebar-option'>
                                        <Link to='/profile' className='check' >Thông tin cá nhân</Link>
                                        <Link to='/changepassword' className='uncheck'>Thay đổi password</Link>
                                    </div>
                                </div>
                            </div>
                            <div className='col bg-light'>
                                <div className='profile-detail'>

                                    <div className='profile-form'>
                                        <Formik
                                            initialValues={{
                                                firstname: '',
                                                lastname: "",
                                                phone: '',
                                                address: '',
                                                gender: 'Male',
                                                dob: '',
                                                email: '',
                                            }}

                                            onSubmit={handleSubmitForm}
                                            validationSchema={validationSchema}

                                        >
                                            {({ errors, touched }) => (
                                                <Form>
                                                    <div className='profile-title'>Hồ sơ cá nhân</div>
                                                    <div className='avatar d-flex align-items-center gap-5 mb-4'>
                                                        <img src={images.avatarDefault} alt='avatar default' />
                                                        <div className='btn-upload'>
                                                            <label htmlFor='uploadAvatar'>
                                                                <div className='btn btn-bg-primary text-white btn-radius'>Upload file</div>
                                                            </label>
                                                            <input type='file' id='uploadAvatar' hidden />
                                                        </div>
                                                        <div className='btn btn-bg-danger text-white btn-radius'>Remove</div>
                                                    </div>
                                                    <div className='form-info'>
                                                        <div className='form-group row align-items-center mb-4'>
                                                            <label className='col-md-2' htmlFor='firstname'>
                                                                first Name
                                                            </label>
                                                            <div className='col-md-10'>
                                                                <Field type='text' placeholder='firstname' name='firstname' id='firstname' className='form-control' />
                                                                <h5>  <ErrorMessage name="firstname" /></h5>

                                                            </div>
                                                        </div>
                                                        <div className='form-group row align-items-center mb-4'>
                                                            <label className='col-md-2' htmlFor='lastname'>
                                                                last Name
                                                            </label>
                                                            <div className='col-md-10'>
                                                                <Field type='text' placeholder='lastname' name='lastname' id='lastname' className='form-control' />
                                                                <h5>  <ErrorMessage name="lastname" /></h5>
                                                            </div>
                                                        </div>
                                                        <div className='form-group row align-items-center mb-4'>
                                                            <label className='col-md-2' htmlFor='phone'>
                                                                SĐT
                                                            </label>
                                                            <div className='col-md-10'>
                                                                <Field type='number' placeholder='phone' name='phone' id='phone' className='form-control' />
                                                                <h5>  <ErrorMessage name="phone" /></h5>
                                                            </div>
                                                        </div>
                                                        {/* <div className='form-group row align-items-center mb-4'>
                                                        <label className='col-md-2' htmlFor='address'>
                                                            Địa chỉ
                                                        </label>
                                                        <div className='col-md-10'>
                                                            <Field type='text' placeholder='Địa chỉ' name='address' id='address' className='form-control' />
                                                        </div>
                                                    </div> */}
                                                        {/* <div className='form-group row align-items-center mb-4'>
                                                        <label className='col-md-2' htmlFor='gender'>
                                                            Giới tính
                                                        </label>
                                                        <div className='col-md-10'>
                                                            <div className='d-flex justify-content-between align-items-center gap-5'>
                                                                <Field as='select' name='gender' id='gender' className='w-25 form-select'>
                                                                    <option value='Male'>Nam</option>
                                                                    <option value='Female'>Nữ</option>
                                                                </Field>
                                                                <div className='d-flex align-items-center w-75'>
                                                                    <label className='w-25' htmlFor='dob'>
                                                                        Ngày sinh
                                                                    </label>
                                                                    <div className='w-75'>
                                                                        <Field type='date' placeholder='Ngày sinh' name='dob' id='dob' className='form-control' />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div> */}
                                                    </div>
                                                    <div className='profile-title'>Thông tin bảo mật</div>
                                                    <div className='form-group row align-items-center mb-4 mt-4'>
                                                        <label className='col-md-2' htmlFor='email'>
                                                            Email
                                                        </label>
                                                        <div className='col-md-10'>
                                                            <Field type='email' placeholder='Email' name='email' id='email' className='form-control' />
                                                            <h5>  <ErrorMessage name="email" /></h5>
                                                        </div>
                                                    </div>
                                                    <button type='submit' className='text-center btn btn-bg-primary text-white'>Lưu thay đổi</button>
                                                </Form>
                                            )}
                                        </Formik>


                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>

                </div>

            )}

        </>

    )
}

export default Profile