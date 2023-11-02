import Menuadmin from "../components/Menu_Admin/Menu_Admin.js";
import '../scss/Adminpage.scss';
import Tablepost from "../components/Table_Admin/Tablepost.js";
import Tableaccount from "../components/Table_Admin/Tableaccount.js";
import Footer from "../components/Footer/Footer.js";
import React, {useState,useEffect} from "react";
const Adminpage = (props) => {
    const active = props.action;
    return (
        <>
            <div className="container-fluid padding-unset">
                <div className="row">
                    <div className="col-2 padding-unset">
                        <Menuadmin />
                    </div>
                    <div className="col-10 padding-unset">
                    {active === 'post' ? <Tablepost/> : <Tableaccount/>}
                    </div>
                </div>
            </div>
            <div>
                <Footer />
            </div>
        </>
    )

}

export default Adminpage;