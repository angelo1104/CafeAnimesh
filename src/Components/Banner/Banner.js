import React from "react";
import './Banner.css'

function Banner({title,imageUrl}) {

    const bannerStyles = {
        display: 'flex',
        height: '400px',
        justifyContent: 'center',
        alignItems:'center',
        textAlign: 'center',
        background: `url(${imageUrl})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPositionY: '-200px',
    }

    return(
        <div className="banner" style={bannerStyles}>
            <h1>
                {title}
            </h1>
        </div>
    )
}

export default Banner