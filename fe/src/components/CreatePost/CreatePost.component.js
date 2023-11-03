import { useEffect, useRef, useState } from "react";
import { Modal, Form, Stack } from 'react-bootstrap';
import ButtonReact from 'react-bootstrap/Button';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Space, Upload, notification } from 'antd';
import { getAllCategory } from "../../services/category.service"
import { getAllInterior } from "../../services/interior.service"
import { getAllSecurity } from "../../services/security.service"
import { getAllUtil } from "../../services/util.service"

const CreatePost = () => {
    const [fileList, setFileList] = useState([]);
    const [category, setCategory] = useState([])
    const [security, setSecurity] = useState([])
    const [interior, setInterior] = useState([])
    const [util, setUtil] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const categoryRes = await getAllCategory();
                const interiorRes = await getAllInterior();
                const securityRes = await getAllSecurity();
                const utilRes = await getAllUtil();
                setCategory(categoryRes.data);
                setInterior(interiorRes.data);
                setSecurity(securityRes.data);
                setUtil(utilRes.data);
            } catch (error) {
                console.error('An error occurred while fetching data:', error);
            }
        }
        fetchData();
    }, [])
    console.log(category);
    const handleImageUpload = (event) => {
        // Handle image upload logic
    };

    const handleUpload = () => {
        // Handle image upload logic
    };
    const props = {
        onRemove: (file) => {
            const index = fileList.indexOf(file);
            const newFileList = fileList.slice();
            newFileList.splice(index, 1);
            setFileList(newFileList);
        },
        beforeUpload: (file) => {
            setFileList([...fileList, file]);
            return false;
        },
        fileList,
    };
    return (
        <div className="container mt-5">
            <h2>Create Post</h2>
            <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="name product"
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Stack direction="horizontal" gap={2}>
                                <Form.Label>Images</Form.Label>
                                <Space direction="vertical" style={{ width: '100%' }} size="large">
                                    <Upload
                                        {...props}
                                        listType="picture"
                                        maxCount={5}
                                        multiple
                                        fileList={fileList}
                                        onChange={({ fileList }) => setFileList(fileList)}
                                    >
                                        <Button icon={<UploadOutlined />}>Upload (Max: 5)</Button>
                                    </Upload>
                                </Space>
                            </Stack>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Price($)</Form.Label>
                            <Form.Control
                                type="number"
                                min={0}
                                placeholder="price"
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Discount Percent(%)</Form.Label>
                            <Form.Control
                                type="number"
                                min={0}
                                placeholder="10%,13%,15%,..."
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Stock</Form.Label>
                            <Form.Control
                                type="number"
                                min={0}
                                placeholder="stock"
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Brand Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="#brandname"
                                autoFocus
                            />
                        </Form.Group>
                    </Form>
        </div>
    )
}

export default CreatePost