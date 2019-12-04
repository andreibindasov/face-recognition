import React from 'react';

import './FaceRecognition.css';


function FaceRecognition ({imageUrl, box}) {
    return (
        <div className="center facesImg">
            
                <img id='imageDetected' className="pointer dim facesImg__Img" alt='ImageLink' src={imageUrl}/>
                <div className='bounding-box' style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol }}></div>           
        </div>
    )
}

export default FaceRecognition;