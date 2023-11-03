import Footer from "../components/Footer/Footer.js";
import Searchresult from "../components/Bodysearch/Bodysearch.js";
import { useLocation,useOutletContext } from 'react-router-dom';
import { useEffect, useState } from "react";
import { searchPost,getPostfilter,getAllPost,addPostfavourite,removePostfavourite,getAll } from "../services/post.service.js";
const SearchResultpage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [data, setData] = useState();
    const [totalPages, setTotalPages]= useState();
    const [user, setUser] = useOutletContext();
    const location = useLocation();
    const value = location.state?.value;
    const category = location.state?.category;
    const listpage = location.state?.listpage;
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
    const getDataSearch = async () => {
        try {
            const posts = (await searchPost(value,currentPage)).data.data;
            setData(posts.data);
            setTotalPages(posts.totalPages)
            console.log(posts.data);
        } catch (error) {

        }
    }

    const getDatafilter = async () => {
        const address = category[0].address.map(addressItem => addressItem);
        const area = category[3].area.map(d => d);
        const price = category[1].price.map(d => d);
        const utils = category[2].amenities.map(d => d);

        console.log(address,area,price,utils);
        try {
            const posts = (await getPostfilter(address,area,price,utils,currentPage)).data.data;
            setData(posts);
        } catch (error) {

        }
    }

    const getData = async () => {
        try {
            const posts = (await getAllPost(currentPage)).data;
            setData(posts.data);
            setTotalPages(posts.totalPages)
        } catch (error) {
        }
    }

    const addPostfavourites = async (userId, idPost) => {
        try {
            const posts = (await addPostfavourite(userId, idPost));
        } catch (error) {
            
        }
    }
    const removePostfavourites = async (userId, idPost) => {
        try {
            const posts = (await removePostfavourite(userId, idPost));
        } catch (error) {
            
        }
    }
    useEffect(()=> {
        if(value!= null){
            getDataSearch();
        }
        else if(category!=null){
            getDatafilter();
        }
        else if(listpage!=null && listpage == 'list page'){
            getData();
        }
        else if(listpage!=null && listpage == 'favorite page'){
            getData();
        }
    },[currentPage, value, category,listpage])
    return (

        <>
            <div className="container mt-3 mb-3">
                <div className="row gap-4">
                    <Searchresult totalPages={totalPages} currentPage={currentPage} setCurrentPage={checkCurrentpage} 
                    checkNext={checkNext} checkPrev={checkPrev} dataSource={data} addFavorite={addPostfavourites} user={user} 
                    removeFavorite={removePostfavourites}/>
                </div>
            </div>
            <div>
                <Footer />
            </div>
        </>
    );
}
export default SearchResultpage