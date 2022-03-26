import React from 'react';
import './Loading.css';
const Loading = ({route}) =>{
    if(route === 'loadingScreen'){
        return(
            <div className='center loading-screen'>
                <h1>signing in...</h1>
                <div className='center loading'></div>
            </div>
        );
    }
    else{
        return(
            <div className='center loading'>
            </div>
        );
    }
}

export default Loading;