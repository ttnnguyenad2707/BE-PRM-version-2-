import {
    HomeOutlined,
    DollarOutlined,
    EnvironmentOutlined
} from '@ant-design/icons';
import { Card } from 'antd';
import { useNavigate } from 'react-router-dom';
const PostCard = ({post}) => {
    const navigate = useNavigate();

    const displayDetails = (slug) => {
        navigate(`/post/${slug}`);
    }

    return (
        <Card
            hoverable
            style={{
                width: '95%',
                minHeight: '480px'
            }}
            cover={<img alt="example" src={post.images[0]} />}
            onClick={() => displayDetails(post.slug)}
        >
            <div className='d-flex flex-column gap-2'>
                <h6 className='d-flex gap-2'>
                    <HomeOutlined />
                    {post.title}
                </h6>
                <p className='d-flex gap-2'><DollarOutlined />{post.price}</p>
                <p className='d-flex gap-2'><EnvironmentOutlined />{post.address}</p>
            </div>
        </Card>
    )
}

export default PostCard