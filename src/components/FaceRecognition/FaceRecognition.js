import React from 'react';

import Tilt from 'react-tilt';

import './FaceRecognition.css';


function FaceRecognition ({imageUrl, boxes}) {
    return (
       
        <Tilt id="tlt" className="Tilt br2 facesImg shadow-2 center">
        
                <img id='imageDetected' className="pointer dim  facesImg__Img" alt='ImageLink' src={imageUrl}/>
                {boxes.map(box=> {
                        return <div key={box.topRow} className='bounding-box' style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol }}></div>           
                })
                
                }
        </Tilt> 
    )
}

export default FaceRecognition;