import Footer from "../components/Footer/Footer.js";
import Searchresult from "../components/Bodysearch/Bodysearch.js";
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from "react";
import { searchPost } from "../services/post.service.js";
const SearchResultpage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [data, setData] = useState();
    const location = useLocation();
    const value = location.state?.value;
    const checkCurrentpage = (n) =>{
        setCurrentPage(n)
    }
    const checkPrev = () =>{
        setCurrentPage(currentPage -1)
    }
    const checkNext = () =>{
        setCurrentPage(currentPage +1)
    }
    console.log(currentPage);
    const getData = async () => {
        try {
            const posts = (await searchPost(value,currentPage)).data.data;
            setData(posts);
        } catch (error) {

        }
    }

    useEffect(()=> {
        getData();
    },[currentPage])

    console.log(data);
    return (

        <>
            <div className="container mt-3 mb-3">
                <div className="row gap-4">
                    <Searchresult currentPage={currentPage} setCurrentPage={checkCurrentpage} checkNext={checkNext} checkPrev={checkPrev} dataSource={data} />
                </div>
            </div>
            <div>
                <Footer />
            </div>
        </>
    );
}
export default SearchResultpage