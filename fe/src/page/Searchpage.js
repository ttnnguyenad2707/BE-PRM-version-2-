import Footer from "../components/Footer/Footer.js";
import Searchresult from "../components/Bodysearch/Bodysearch.js";

const SearchResultpage = () => {

    return (

        <>
            <div className="container mt-3 mb-3">
                <div className="row">
                    <Searchresult />
                </div>
            </div>
            <div>
                <Footer />
            </div>
        </>
    );
}
export default SearchResultpage