import React, { useState } from 'react';
import './Bodysearch.scss'
import {
    UserOutlined,
    EnvironmentOutlined
} from '@ant-design/icons';
const Searchresult = (dataSoure) => {
    const [favorite, setFavorite]= useState();

    const Checkclick = () => {
        var element = document.getElementById("icon-favorite");
        if(element.className === "bi-heart"){
            element.className = "bi-heart-fill";
        }
        else {
            element.className = "bi-heart";
        }
    }
    return (
        <div className='Bodysearch d-flex flex-column gap-3'>
            <div className='Card_search d-flex gap-4'>
                <img src='https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png' className='image-card' />
                <div className='d-flex flex-column gap-4'>
                    <h5>Nha tro TTN</h5>
                    <p>
                        100m
                    </p>
                    <p>13trieu/thang</p>
                    <div className='d-flex gap-2'>
                        <UserOutlined style={{ color: '#E66D4F', fontSize: '20px' }} />
                        <p>Tran Trung Nguyen</p>
                        <EnvironmentOutlined style={{ color: '#E66D4F', fontSize: '20px' }} />
                        <p>Hoa Lac</p>
                    </div>
                </div>
               <button className='btn-favorite d-flex mb-3 me-4' onClick={()=>Checkclick()}><i className="bi-heart" id='icon-favorite'> Save</i></button>
            </div>
        </div>
    );

}

export default Searchresult