import React from 'react';
import ProfileMenu from '../Profile/ProfileMenu';

const Navigation = ({onRouteChange, isSignin, profile}) =>{
  if(profile){
    return(
      <nav style={{display:'flex', justifyContent:'flex-end'}}>
        <p onClick={()=>{onRouteChange('home')}} className='f3 link dim black underline pa3 pointer'>Home</p>
        <p onClick={()=>{onRouteChange('signin')}} className='f3 link dim black underline pa3 pointer'>Sign out</p>
     </nav>
    )
  }
  else if(isSignin){
   return(
     <nav className='flex flex-row-reverse'> 
        <div  className='pa2 pointer'>
          <ProfileMenu onRouteChange={onRouteChange}/>
        </div>
        {/* <p onClick={()=>{onRouteChange('signin')}} className='f3 link dim black underline pa3 pointer'>Sign out</p> */}
    </nav>
    );}
    else {
      return(
        <nav style={{display:'flex', justifyContent:'flex-end'}}>
          <p onClick={()=>{onRouteChange('signin')}} className='f3 link dim black underline pa3 pointer'>Sign in</p>
          <p onClick={()=>{onRouteChange('register')}} className='f3 link dim black underline pa3 pointer'>Register</p>
        </nav>
      ); 
    }
}

export default Navigation;