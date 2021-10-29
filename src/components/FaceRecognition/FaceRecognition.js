import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({imageUrl, box}) => {
        return(
            <>
             <div className='container ma' style={{height: '100%'}}>
                    <div className='absolute mt2'>
                        <img alt='' 
                            id='inputImage'
                            src={imageUrl}
                            width='500px'
                            height= 'auto'
                        />
                    {box.map(box=>{
                        // console.log(box.topRow);
                        return(
                                <div className='bounding-box' style={{ top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
                        );
                    })}
                    </div>
             </div> 
            </>
         );
}

export default FaceRecognition;