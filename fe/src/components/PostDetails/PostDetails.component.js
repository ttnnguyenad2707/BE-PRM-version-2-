import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import images from '../../assets/images'
import { GlobalOutlined,MessageOutlined,PhoneOutlined } from '@ant-design/icons'
const PostDetails = () => {
    return (
        <div className='container'>
            <div className='row'>
                <div className='col-8'>
                    <div className='post-content'>
                        <div className='post-slide'>
                            <img src={images.postImageDefault} alt='post-image' width="100%" />

                        </div>
                        <div className='post-info'>
                            <h4 className='title'>Phòng trong nhà nghỉ nông trại chủ nhà Le</h4>
                            <div className='price'> 2 triệu đồng / tháng  <span>25m2</span> </div>
                            <div className='d-flex gap-3'>
                                <span> <GlobalOutlined /> Thôn 3 Thạch hòa-Hà nội</span>
                                <span> Đăng ngày : 20-10-2023 </span>
                            </div>

                            <div className='room-info'>

                                <h4>Thông tin phòng trọ</h4>
                                <div className='d-flex gap-3'>
                                    <ul>
                                        <li>Diện tích: 25m2</li>
                                        <li>An ninh : khóa vân tay , chung chủ ,PCCC</li>
                                        <li>Nội thất :Tủ lạnh, điều hòa, tủ quần áo, tủ bát, số giường, bàn học </li>

                                    </ul>
                                    <ul>
                                        <li>Tiện ích khác : máy giặt ,thang máy,hầm để xe</li>
                                        <li>Tiền cọc : 10000 vnd</li>
                                        <li>Số người tối đa : 4 người</li>
                                    </ul>

                                </div>
                                <h4>Mô tả chi tiết</h4>
                                <p>Nhà đẹp phân lô Mễ Trì, xây 7 tầng, thang máy, kinh doanh sầm uất, ô tô tránh, ngủ trong nhà Nhà hoàn thiện đẹp,
                                    điều hòa âm trần, làm văn phòng kinh doanh kết hợp ở tuyệt vời</p>
                            </div>
                        </div>
                        <div className='room-address'>
                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.7330253564114!2d105.51734237479548!3d21.00333628865218!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31365730731c760b%3A0x6b107bdf681c16ac!2sThi%C3%AAn%20Long%20Building!5e0!3m2!1svi!2s!4v1697290825634!5m2!1svi!2s" width="100%" height="450" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                        </div>
                        <div className='post-comment'>
                            <h4>Bình Luận or Đánh giá</h4>
                            <div className='shadow p-3 mb-5 bg-body-tertiary rounded'>
                                <div className='comment-box mb-3'>
                                    <div className='comment-user'>
                                        <div className='d-flex'>
                                            <div className='avatar'>
                                                <img src={images.avatarDefault} alt='avatar' width="100%"></img>
                                            </div>
                                            <div className='user-info'>
                                                <div>Nguyen Tran</div>
                                                <div>20-10-2923</div>
                                            </div>
                                        </div>
                                        <div className='comment-content'>
                                            Phòng thực sự quá đẹp so với kỳ vọng của tôi cảm ơn page nhiều
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
                <div className='col'>
                    <div className='shadow p-3 mb-5 bg-body-tertiary rounded'>
                        <div className='poster-box d-flex align-items-center'>
                            <div className='d-flex gap-2'>
                                <img src={images.avatarDefault} alt='avatar-poster' width="100%"/>
                                <span>Nguyen Tran</span>
                            </div>
                            <button className='btn bt-primary'>Xem trang cá nhân</button>
                        </div>
                        <div className='contact-box d-flex gap-4 flex-column'>
                            <h4>Liên hệ với người cho thuê</h4>
                            <button className='btn bt-primary w-100 p-3 d-flex gap-3 align-items-center rounded'>
                                <MessageOutlined />
                                Chat với người bán
                            </button>
                            <a href='tel:0943895292' className='btn bt-primary w-100 p-3 d-flex gap-3 align-items-center rounded'>
                                <PhoneOutlined />
                                Gọi 0943895292
                            </a>
                            
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default PostDetails