import React from 'react';

import Tilt from 'react-tilt';

import './FaceRecognition.css';


function FaceRecognition ({imageUrl, box}) {
    return (
       
               
                    <Tilt id="tlt" className="Tilt br2 facesImg shadow-2 center">
                        
                            <img id='imageDetected' className="pointer dim  facesImg__Img" alt='ImageLink' src={imageUrl}/>
                            <div className='bounding-box' style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol }}></div>           
                    
                    </Tilt> 
               
          
           
    )
}

export default FaceRecognition;