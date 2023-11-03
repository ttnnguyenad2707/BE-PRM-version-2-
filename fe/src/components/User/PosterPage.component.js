import { useParams } from "react-router-dom"
import images from "../../assets/images";
import { useEffect, useState } from "react";
import { getPostedByOwner, getPosterInfo } from "../../services/post.service";
import moment from "moment";
import PostCard from "../PostCard/PostCard.component";

const PosterProfile = () => {
    const {posterId} = useParams();
    const [posterInfo,setPosterInfo] = useState({})
    const [posted,setPosted] = useState([])
    useEffect(() => {
        getPosterInfo(posterId).then(data => setPosterInfo(data.data));
    },[])
    useEffect(() =>{
        getPostedByOwner(posterId).then(data => setPosted(data.data));
    },[])
    
    return (
        <div className="bg-F4F4F4">
            <div className="container">
                <div className="row">
                    <div className="col-3">
                        <div className="user-box  bg-white rounded pt-5 pb-4 ps-4 pe-4 mt-5 d-flex flex-column gap-3">
                            <div className="d-flex flex-column gap-2">
                                <img src={images.avatarDefault} alt="avatar" className="w-50"/>
                                <h4>{posterInfo.firstname} {posterInfo.lastname}  </h4>

                            </div>
                            <button className="btn bt-primary rounded fw-bold"> + Theo dõi</button>
                            <div className="fs-5"><i class="bi bi-calendar"></i> Đã tham gia: {moment(new Date(posterInfo.createdAt)).format('DD/MM/YYYY')}</div>
                            
                            {posterInfo.address && (<div className="fs-5"><i class="bi bi-geo-alt-fill"></i>{posterInfo.address}</div>)}
                        </div>
                    </div>
                    <div className="col">
                        <div className="posted-list-box bg-white mt-5 p-3">
                            <h5 className="text-center border-bottom border-danger border-3 pb-4">Bài viết đang hiển thị</h5>
                            <div className="row mt-4">
                                {posted?.map(post => (<div className="col-3"><PostCard post={post} /> </div> ))}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
export default PosterProfile