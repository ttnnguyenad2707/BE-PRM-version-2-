import React, { useEffect, useState } from 'react'
import { getPostedById } from '../../services/post.service'
import { useParams } from 'react-router-dom';
import './Profile.scss'


const PostEdit = () => {
    const { id } = useParams();
    const [data, setData] = useState({});
    console.log(data);
    useEffect(() => {
        getPostedById(id).then(data => setData(data.data[0]))
    }, [])
    return (
        <div className='component component-profile bg-F4F4F4'>
            <div className='container'>
                <div className='row'>

                    <div className='col bg-light'>
                        <div className='profile-detail'>

                            <div className='profile-form'>
                                <form method='POST' action=''>
                                    <div className='profile-title mb-4'>
                                        Thay đổi thông tin bài viết
                                    </div>

                                    <div className='form-info'>
                                        <div className='form-group row align-items-center mb-4'>
                                            <label className='col-md-2' htmlFor='category'>Danh mục </label>
                                            <div className='col-md-10'><input type='text'  name='category' id='category' className='form-control' value={data.category}></input></div>
                                        </div>
                                        <div className='form-group row align-items-center mb-4'>
                                            <label className='col-md-2' htmlFor='title'>Tiêu đề</label>
                                            <div className='col-md-10'><input type='text' placeholder='title' name='title' id='title' className='form-control' value={data.title}></input></div>
                                        </div>
                                        <div className='form-group row align-items-center mb-4'>
                                            <label className='col-md-2' htmlFor='description'>Chi tiết</label>
                                            <div className='col-md-10'><input type='text' placeholder='description' name='description' id='description' className='form-control' value={data.description}></input></div>
                                        </div>
                                        


                                    </div>
                                    <div className='text-center'>
                                        <button type='submit' className='text-center btn btn-bg-primary text-white'>Lưu thay đổi</button>
                                    </div>
                                </form>


                            </div>

                        </div>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default PostEdit