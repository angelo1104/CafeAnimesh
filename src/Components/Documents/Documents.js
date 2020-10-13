import React from "react";
import './Documents.css';
import Header from "../Header/Header";
import Banner from "../Banner/Banner";
import Resources from "./Resources/Resources";

function Documents() {
    return(
        <div className="documents">
            <Header/>

            <Banner imageUrl={'http://cafeanimesh.weebly.com/files/theme/images/bg-light.jpg?1592320655'}/>
            <div className="main-documents">
                <h2><span className='documents-bold'>Repository :</span> textbooks,articles,presentations,images,etc.</h2>

                <div className="resources-section">
                    <Resources/>
                    <Resources/>
                    <Resources/>
                </div>

            </div>
        </div>
    )
}

export default Documents;