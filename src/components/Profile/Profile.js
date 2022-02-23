import React, {useState} from 'react';
// import Modal from '../Modal/Modal';
// import ProfileModal from '../Modal/ProfileModal';
import EditProfile from './EditProfile';
import Logo from './logo.png';


const Profile = ({user, loaduser, onRouteChange}) =>{
    const [isProfileOpen, setIsprofileopen] = useState(false);


    const toggleProfileEditing = () =>{
      setIsprofileopen(prevState=>!prevState);
    }

    // const deleteAccount = () =>{
    //     onRouteChange('register');
    // }

    return(
        <div className='relative'>
        {/* {console.log(isProfileOpen)}
           {isProfileOpen &&
            <Modal>
                <ProfileModal toggleProfileEditing={toggleProfileEditing}/>
            </Modal>} */}
            <article className=" w-80 mw6-ns shadow-2 center bg-white br3 pa2 pa3-ns mv3 ba b--black-10">
                <div className="tc">
                    <img src={Logo} alt='' className="br-100 h4 w4 h5-ns w5-ns dib"/>
                </div>
                <p className="lh-copy f5 black-70"><strong>UserId: {user.id}</strong></p>
                <hr/>
                {!isProfileOpen?
                <div>
                <div className='measure center tl w-80 w-50-ns'>
                    <p className="lh-copy f5 black-70"><strong>Name: {user.name}</strong></p>
                    <p className="lh-copy f5 black-70"><strong>Email: {user.email}</strong></p>
                    <p className="lh-copy f5 black-70"><strong>Images submitted: {user.entries}</strong></p>
                </div>
                <p 
                className="link tc measure center w-80 w-50-ns ph3 pv1 db pointer bg-animate bg-blue hover-bg-dark-blue white f5 br1"
                 onClick={toggleProfileEditing}
                 >Edit Account</p>
                {/* <p className="link tc measure center w-80 w-50-ns ph3 pv1 db pointer bg-animate bg-red hover-bg-dark-red white f5 br1"
                 onClick={deleteAccount}
                 >Delete Account</p>       */}
                </div>
                :
                <EditProfile toggleProfileEditing={toggleProfileEditing} user = {user} loaduser={loaduser}/>                
                }
            </article>
        </div>
    );
}

export default Profile;