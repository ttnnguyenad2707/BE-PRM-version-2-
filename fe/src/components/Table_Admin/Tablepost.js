import React from 'react';
import { Space, Table, Tag, Button } from 'antd';
import {FormOutlined,DeleteOutlined, LockOutlined,UnlockOutlined} from '@ant-design/icons'
const { Column, ColumnGroup } = Table;
const Tablepost = () => {
    const data = [
        {
            key: '1',
            firstName: 'John',
            lastName: 'Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
            tags: ['nice', 'developer'],
        },
        {
            key: '2',
            firstName: 'Jim',
            lastName: 'Green',
            age: 42,
            address: 'London No. 1 Lake Park',
            tags: ['loser'],
        },
        {
            key: '3',
            firstName: 'Joe',
            lastName: 'Black',
            age: 32,
            address: 'Sydney No. 1 Lake Park',
            tags: ['cool', 'teacher'],
        },
    ];
    const columns = [
        {
            title: 'STT',
            dataIndex: 'key',
            key: 'id',
            width: '10%'
        },
        {
            title: 'Post',
            dataIndex: 'firstName',
            key: 'Namejob',
            width: '50%'
        },
        
        {
            title: 'Author',
            dataIndex: 'lastName',
            key: 'Status',
            width: '20%'
        },
        {

            title: 'Report',
            dataIndex: 'age',
            key: 'action',
            width: '10%'
        },
        {

            title: 'Action',
            key: 'action',
            render: (record) => (
                <Space size="middle">
                    <button className='btn-lock'  onClick={() => {
                            console.log(record);
                            }}>
                        <LockOutlined  style={{
                            fontSize: '20px',
                            color: 'red',
                        }} /> Lock
                        {/* <i class="bi bi-trash-fill"></i> */}
                    </button>
                    <button className='btn-unlock' onClick={() => {
                        console.log(record);
                    }}>
                        <UnlockOutlined style={{
                            fontSize: '20px',
                            color: 'blue',
                        }}/> Unlock
                    </button>
                </Space>
            ),
            width: '10%'
            
        },
    ];
    return (
        <Table dataSource={data} columns={columns} pagination={false}>
        </Table>
    );
}
export default Tablepost;