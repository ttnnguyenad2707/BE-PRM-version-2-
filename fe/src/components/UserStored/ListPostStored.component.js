import { Space, Table } from "antd"
import { useEffect, useState } from "react"
import { deletePost, destroyPost, getPostedStore, restorePost } from "../../services/post.service";
import Column from "antd/es/table/Column";
import ColumnGroup from "antd/es/table/ColumnGroup";
import { useNavigate } from "react-router-dom";

const ListPostStored = ({ type }) => {
    const [dataPosted, setDataPosted] = useState([]);
    console.log(dataPosted);
    useEffect(() => {
        getPostedStore(type).then(data => { setDataPosted(data.data) });

    }, [])

    const handleDelete = (id) => {
        console.log(id);

        deletePost(id).then(() => {
            // Sau khi xóa thành công, cập nhật lại state dataPosted
            setDataPosted(prevData => prevData.filter(post => post._id !== id));
        });;
    }

    const navigate = useNavigate()

    const handleEdit = (id) => {
        console.log(id);
        navigate(`${id}`);
    }

    const handleRestore = (id) => {
        restorePost(id).then(() => {
            // Sau khi khôi phục thành công, cập nhật lại state dataPosted
            setDataPosted(prevData => prevData.filter(post => post._id !== id));
        });;

    }

    const handleDestroy = (id) => {
        console.log(id);
        destroyPost(id).then(() => {
            // Sau khi xóa vĩnh viễn thành công, cập nhật lại state dataPosted
            setDataPosted(prevData => prevData.filter(post => post._id !== id));
        });;

    }

    return (
        <div>
            <Table dataSource={dataPosted}>
                <ColumnGroup>
                    <Column
                        title="Số thứ tự"
                        dataIndex="_index"
                        key="_index"
                        render={(_, __, index) => index + 1}
                    />
                    <Column title="Tiêu đề" dataIndex="title" key="title" />
                    <Column title="Địa chỉ" dataIndex="address" key="address" />
                    <Column title="Giá thuê" dataIndex="price" key="price" />
                    <Column title="Số người" dataIndex="maxPeople" key="maxPeople" />
                    {type === "posted" && <Column title="Action" key="action" render={(_, record) => (
                        <Space size="middle">
                            <a className="btn btn-outline-info" onClick={() => handleEdit(record._id)}>Edit</a>
                            <a className="btn btn-outline-danger" onClick={() => handleDelete(record._id)}>Delete</a>
                        </Space>
                    )} />}
                    {type === "deleted" && <Column title="Action" key="action" render={(_, record) => (
                        <Space size="middle">
                            <a className="btn btn-outline-info" onClick={() => handleRestore(record._id)}>Restore</a>
                            <a className="btn btn-outline-danger" onClick={() => handleDestroy(record._id)}>Destroy</a>
                        </Space>
                    )} />}
                </ColumnGroup>
            </Table>            
        </div>
    )
}
export default ListPostStored