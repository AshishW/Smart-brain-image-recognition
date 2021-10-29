import React from "react";
import './ImageLinkForm.css';
const ImageLinkForm = ({onInputChange, onButtonSubmit}) => {
    return(
        <div>
            <p className='f3-ns'>
                {`This Magic Brain will detect faces in your pictures. Give it a try!`}
            </p>
            <div className='center'>
                <div className='form center pa3 w-60-l  br3 shadow-5'> 
                    <input className ='f4 pa2 w-60 w-40-l center'type='text'
                    placeholder='enter the image address'
                    onChange={onInputChange}
                    />
                    <button className='w-40 w-30-l pointer f4 link ph3 pv2 dib white bg-light-purple'
                    onClick={onButtonSubmit}
                    >Detect</button>
                </div>
            </div>
         </div>
    );
}
export default ImageLinkForm;
