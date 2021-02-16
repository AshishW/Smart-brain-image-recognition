import React from "react";
import Tilt from 'react-tilt';
import './Logo.css'
const Logo = () => {
 return(
    <div className='ma4 mt0'>
       <Tilt className="Tilt br2 shadow-2 pointer " options={{ max : 65}} style={{ height: 120, width: 120 }} >
         <div className="Tilt-inner pa3"><div className=' logotxt pa2 mt2 f3'>Smart Brain</div></div>
       </Tilt>
    </div>
 );
 
}
export default Logo;