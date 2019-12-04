import React from 'react';
import './ImageLinkForm.css';


function ImageLinkForm ({ onInputChange, onSubmit }) {
    return (
        <div>
            <p className='p f3'>
                {'This AI will detect faces in your pictures'}
            </p>
            <div className='center'>
                <div className='form center pa4 br3 shadow-5'>
                    <input className='f4 pa2 w-70 center' type="text" onChange={onInputChange} />
                    <button className='w-30 grow f3 link ph3 pv2 dib white bg-light-purple' onClick={onSubmit}>DETECT</button>
                </div>
            </div>
        </div>
    )
}

export default ImageLinkForm;