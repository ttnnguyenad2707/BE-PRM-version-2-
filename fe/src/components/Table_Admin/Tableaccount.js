import React, { useEffect, useState } from 'react';
import { Space, Table, Tag, Button } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import { FormOutlined, DeleteOutlined, LockOutlined, UnlockOutlined, PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons'
import './Tableaccount.scss';
import { getUserList, lockUsers, unlockUsers, updateroleServices, rollbackSevices } from '../../services/user.service';
const { Column, ColumnGroup } = Table;
const Tableaccount = () => {
    const [Dataindex, setDataindex] = useState();
    const userList = async () => {
        try {
            const data = (await getUserList()).data.data;
            const dataTable = data.map(d => (
                {
                    isVip: d.isVip == true ? "VIP" : "Default",
                    status: d.status == true ? "Unlock" : "Lock",
                    id: d._id,
                    firstname: d.firstname,
                    lastname: d.lastname,
                    email: d.email,
                    admin: d.admin == true ? "Admin" : "User",
                }
            ))
            setDataindex(dataTable)
            console.log(dataTable);
        } catch (error) {

        }
    }

    const blockUser = async (id) => {
        console.log(id, 'hi');
        try {
            const data = (await lockUsers(id))
        } catch (error) {
            console.log(error);
        }
    }

    const unlockUser = async (id) => {
        console.log(id, 'hi');
        try {
            const data = (await unlockUsers(id))
        } catch (error) {
            console.log(error);
        }
    }
    const updateRoleUser = async (id) => {
        console.log(id, 'hi');
        try {
            const data = (await updateroleServices(id))
        } catch (error) {
            console.log(error);
        }
    }
    const rollbackUser = async (id) => {
        console.log(id, 'hi');
        try {
            const data = (await rollbackSevices(id))
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        userList()
    }, [])

    const clickCheckLock = (record) => {
        const check = document.getElementById(record);

        if (check && check.className === "bi bi-lock-fill") {
            check.className = "bi bi-unlock-fill"
            unlockUser(record)
            toast.success('Đã mở khóa người dùng')
        }
        else {
            check.className = "bi bi-lock-fill"
            blockUser(record)
            toast.success('Đã khóa người dùng')
        }

    }
    const clickUpdateRole = (record,id) => {
        const check = document.getElementById(record);
        console.log(check, 'hi');
        if (check && check.className === "bi bi-arrow-down-circle-fill") {
            rollbackUser(id)
            check.className = "bi bi-arrow-up-circle-fill"
            toast.success('Đã cập nhật vai trò người dùng ')
        }
        else if(check.className === "bi bi-arrow-up-circle-fill") {
            updateRoleUser(id)
            check.className = "bi bi-arrow-down-circle-fill"
            toast.success('Đã cập nhật vai trò người dùng ')
        }

    }
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
            title: 'Email',
            dataIndex: 'email',
            key: 'id',
            width: '20%'
        },
        {
            title: 'Name',
            dataIndex: 'lastname',
            key: 'Namejob',
            width: '10%'
        },
        {
            title: 'Vip',
            dataIndex: 'isVip',
            key: 'Namejob',
            width: '10%'
        },
        {
            title: 'Role',
            dataIndex: 'admin',
            key: 'Status',
            width: '10%',
            render: (text, record) => {
                if (text == 'Admin') {
                    return (
                        <span style={{ color: 'red' }}>{text}</span>
                    )
                }
                else{
                    return (
                        <span style={{ color: 'blue' }}>{text}</span>
                    )
                }
            }

        },
        {

            title: 'Status',
            dataIndex: 'status',
            key: 'action',
            width: '20%',
            render: (text, record) => {
                if (text == 'Lock') {
                    return (
                        <span style={{ color: 'red' }}>{text}</span>
                    )
                }
                else{
                    return (
                        <span style={{ color: 'blue' }}>{text}</span>
                    )
                }
            }
        },
        {

            title: 'Action',
            key: 'action',
            render: (record) => (
                <Space size="middle">
                    <button className='btn-lock' onClick={() => clickCheckLock(record.id)}>
                        {record.status == 'Lock' ? (
                            <i className="bi bi-lock-fill" id={record.id} style={{ fontSize: '30px', color: '#E66D4F' }} ></i>
                        ) : (
                            <i className="bi bi-unlock-fill" id={record.id} style={{ fontSize: '30px', color: '#E66D4F' }} ></i>
                        )}
                    </button>
                    <button className='btn-update-role' onClick={() => clickUpdateRole(record.email,record.id)}>
                        {record.admin == 'Admin' ? (
                            <i className="bi bi-arrow-down-circle-fill" id={record.email} style={{ fontSize: '30px', color: '#E66D4F' }}></i>
                        ) : (
                            <i className="bi bi-arrow-up-circle-fill" id={record.email} style={{ fontSize: '30px', color: '#E66D4F' }}></i>
                        )}
                    </button>
                </Space>
            ),
            width: '30%'

        },
    ];
    return (
        <Table dataSource={Dataindex} columns={columns} pagination={false}>
        </Table>
    );
}
export default Tableaccount;