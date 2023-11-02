import React, { useEffect, useState } from 'react';
import { Space, Table, Tag, Button } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import { FormOutlined, DeleteOutlined, LockOutlined, UnlockOutlined } from '@ant-design/icons'
import { getAllPost } from '../../services/post.service';
const { Column, ColumnGroup } = Table;
const Tablepost = () => {
    const [Dataindex, setDataindex] = useState();
    const clickCheckLock = (record) => {
        console.log(record);
        const check = document.getElementById(record);

        if (check && check.className == "bi bi-lock-fill") {
            check.className = "bi bi-unlock-fill"
            toast.success('Đã mở khóa bài đăng')
        }
        else{
            check.className = "bi bi-lock-fill"
            toast.success('Đã khóa bài đăng')
        }
        
    }

    const listPost = async() => {
        try {
            const data = (await getAllPost()).data.data;
            console.log(data);
            const dataPost = data.map(d => (
               {
                category: d.category,
                createAt: d.createdAt,
                deleted: d.deleted === false ? "Open":"Deleted",
                owner: d.owner,
                id: d._id,
                title: d.title,
                image: d.images[0]
               }
            ))
            setDataindex(dataPost);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=> {
        listPost();
    },[])
    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'id',
            width: '10%'
        },
        {
            title: 'Owner',
            dataIndex: 'owner',
            key: 'Namejob',
            width: '20%'
        },

        {
            title: 'Deleted',
            dataIndex: 'deleted',
            key: 'Status',
            width: '10%'
        },
        {

            title: 'Category',
            dataIndex: 'category',
            key: 'action',
            width: '10%'
        },
        {

            title: 'Report',
            dataIndex: 'category',
            key: 'action',
            width: '10%'
        },
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            width: '20%',
            render: (image) => (
              <Space size="middle">
                <img src={image} alt="Image" style={{width: '274px'}}/>
              </Space>
            )
          },
        {

            title: 'Action',
            key: 'action',
            render: (record) => (
                <Space size="middle">
                    <button className='btn-lock' onClick={() => clickCheckLock(record.key)}>
                        <i className="bi bi-unlock-fill" id={record.key} style={{fontSize: '30px',color: '#E66D4F'}} ></i>
                    </button>
                </Space>
            ),
            width: '20%'

        },
    ];
    const paginationConfig = {
        pageSize: 4, // Số lượng mục hiển thị trên mỗi trang
        showSizeChanger: true, // Cho phép thay đổi số lượng mục trên mỗi trang
    };

    console.log(Dataindex, 'hi');
    return (
        <Table dataSource={Dataindex} columns={columns} pagination={paginationConfig }>
        </Table>
    );
}
export default Tablepost;