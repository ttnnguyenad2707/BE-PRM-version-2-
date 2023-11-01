import React from 'react';
import "./Profile.scss"
import 'bootstrap/dist/css/bootstrap.css';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { changePassword } from '../../services/user.service';
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
import { logout } from '../../services/auth.service';

const ChangePass = () => {
    const [user, setUser] = useOutletContext();
    const token = Cookies.get('accessToken');
    const navigate = useNavigate()

    if (user) {
        var userID = user._id
    }
    const handleSubmitForm = async (values, { setSubmitting }) => {
        try {
            // console.log("values", values);
            const res = await changePassword(token, userID, values)
            // console.log("res",res);
            await  logout();
            Cookies.remove('accessToken');
             toast.success(res.data.message)
            navigate("/")
            //  window.location.reload();
        } catch (error) {
            const errors = error.response.data.error;
            console.log(error);

            toast.error(errors);


        }
        // setSubmitting là một hàm để cập nhật trạng thái đang submit của biểu mẫu
    }

    const validate = (values) => {
        const errors = {};
        // Thêm các kiểm tra hợp lệ cho các trường mật khẩu ở đây (nếu cần)
        return errors;
    }
    return (
        <div className='component component-profile bg-F4F4F4'>
            <div className='container'>
                <div className='row gap-3'>
                    <div className='col-md-3 bg-light h-fit-content'>
                        <div className='sidebar'>
                            <div className='sidebar-title'>Thông tin cá nhân</div>
                            <div className='sidebar-option'>
                                <Link to='/profile' className='uncheck'>Thông tin cá nhân</Link>
                                <Link to='/changepassword' className='check'>Thay đổi password</Link>
                            </div>
                        </div>
                    </div>
                    <div className='col bg-light'>
                        <div className='profile-detail'>
                            <div className='profile-form'>
                                <Formik
                                    initialValues={{
                                        password: '',
                                        newPassword: '',
                                        confirmPassword: ''
                                    }}
                                    validate={validate}
                                    onSubmit={handleSubmitForm}
                                >
                                    <Form>
                                        <div className='profile-title mb-4'>
                                            Thay đổi mật khẩu
                                        </div>
                                        <div className='form-info'>
                                            <div className='form-group row align-items-center mb-4'>
                                                <div className=''>
                                                    <Field
                                                        type='password'
                                                        placeholder='Mật khẩu hiện tại'
                                                        name='password'
                                                        id='password'
                                                        className='form-control'
                                                    />
                                                </div>
                                            </div>
                                            <div className='form-group row align-items-center mb-4'>
                                                <div className=''>
                                                    <Field
                                                        type='password'
                                                        placeholder='Mật khẩu mới'
                                                        name='newPassword'
                                                        id='newPassword'
                                                        className='form-control'
                                                    />
                                                </div>
                                            </div>
                                            <div className='form-group row align-items-center mb-4'>
                                                <div className=''>
                                                    <Field
                                                        type='password'
                                                        placeholder='Xác nhận mật khẩu mới'
                                                        name='confirmPassword'
                                                        id='confirmPassword'
                                                        className='form-control'
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className='text-center'>
                                            <button type='submit' className='text-center btn btn-bg-primary text-white'>Lưu thay đổi</button>
                                        </div>
                                    </Form>
                                </Formik>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChangePass;