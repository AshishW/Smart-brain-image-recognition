import React from 'react';
import Loading from '../LoadingAnimation/Loading';
const Rank = ({name, entries, urlRes}) =>{
  if(urlRes){
    return(
      <div>
      <div className='white f5 f3-ns'>
        {`${name}, your current no. of entries is`}
      </div>
      <div className='white f2'>
        {entries}
      </div>
      </div>
    );
  }
  else{
    return(
      <div>
        <Loading/>
        <h3>Detecting face...</h3>
      </div>
      
  );
  }
}

export default Rank;