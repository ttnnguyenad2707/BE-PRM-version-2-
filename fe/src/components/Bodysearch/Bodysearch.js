import React, { useState } from 'react';
import './Bodysearch.scss'
import {
    UserOutlined,
    EnvironmentOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
const Searchresult = ({dataSource, currentPage, setCurrentPage, checkNext, checkPrev }) => {
    const [favorite, setFavorite] = useState();
    const number = [1, 2, 3, 4, 5];
    const data = dataSource;
    const Checkclick = (id) => {
        console.log(id);
        var element = document.getElementById(id);
        if (element && element.className === "bi-heart") {
            element.className = "bi-heart-fill";
        } else {
            element.className = "bi-heart";
        }
    };
    const navigate = useNavigate();
    const handleDetails = (slug) =>{
        navigate(`/post/${slug}`)
    }
    return (
        <>
            {data?.map((m) => {
                return (
                    <div onClick={()=>handleDetails(m.slug)} className='Bodysearch d-flex flex-column gap-3'>
                        <div className='Card_search d-flex gap-4'>
                            <img src={m.images[0]} className='image-card' />
                            <div className='d-flex flex-column gap-4'>
                                <h5>{m.title}</h5>
                                <p>
                                    {m.area} mét vuông
                                </p>
                                <p>{m.price}</p>
                                <div className='d-flex gap-2'>
                                    <UserOutlined style={{ color: '#E66D4F', fontSize: '20px' }} />
                                    <p>{m.title}</p>
                                    <EnvironmentOutlined style={{ color: '#E66D4F', fontSize: '20px' }} />
                                    <p>{m.address}</p>
                                </div>
                            </div>
                            <button className='btn-favorite d-flex mb-3 me-4' onClick={()=>Checkclick(m._id)}><i className="bi-heart" id={m._id}> Save</i></button>
                        </div>
                    </div>
                );
            })}
            <div className='d-flex gap-1 justify-content-end mt-5'>
                <button className='pagging' onClick={() => checkPrev()}>prev</button>
                {number.map((m) => {
                    if (m === currentPage) {
                        return (
                            <button key={m} className='pagging is-active'>
                                {m}
                            </button>
                        );
                    }
                    return (
                        <button key={m} className='pagging' onClick={() => setCurrentPage(m)}>
                            {m}
                        </button>
                    );
                })}
                <button className='pagging' onClick={() => checkNext()}>next</button>
            </div>
        </>
    );

}

export default Searchresult