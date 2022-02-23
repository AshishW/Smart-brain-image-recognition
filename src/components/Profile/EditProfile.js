import React, {useState} from "react";

function EditProfile ({toggleProfileEditing, user, loaduser}){    

    const [userInfo, setUserInfo] = useState({
        name: user.name,
        email: user.email,
    })

    const onFormChange = (event) =>{
       switch (event.target.name) { //name attribute is there in <input .../> 
           case 'user-name':
               setUserInfo({...userInfo, name: event.target.value})
               break;
           case 'user-email':
               setUserInfo({...userInfo, email: event.target.value})
               break;
           default:
               return;
       }
    }
     
    const onFormSubmit = (data) =>{
            fetch(`${process.env.REACT_APP_SERVER}/profile/${user.id}`, {
                method: 'put',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': window.sessionStorage.getItem('token')
                },
                body: JSON.stringify({
                formInput:{
                    name: data.name,
                    email: data.email
                }
                })
            }).then(res=> {
                if(res.status === 200 || res.status === 304){
                    loaduser({...user, ...data});
                    toggleProfileEditing();
                }
            })
            .catch(console.log)
        }
    const {name, email} = userInfo;
    return(
        <div className='measure center ma0'>
            <div className='measure center tl w-80 w-50-ns'>
                <p className="lh-copy f5 black-70"><strong>Name: {name}<input onChange={onFormChange} type='text' name='user-name' value={name} /></strong></p>
                <p className="lh-copy f5 black-70"><strong>Email: {email}<input onChange={onFormChange} className="bg-light-gray" type='email' name='user-email' value={email} disabled /></strong></p>
                <p className="lh-copy f5 black-70"><strong>Images submitted: {user.entries}</strong></p>
            </div>
            <p 
            className="link tc measure center w-80 w-50-ns ph3 pv1 db pointer bg-animate bg-blue hover-bg-dark-blue white f5 br1"
            onClick={()=>onFormSubmit({name, email})}
            >Save changes</p>
            <p className="link tc measure center w-80 w-50-ns ph3 pv1 db pointer bg-animate bg-red hover-bg-dark-red white f5 br1"
            onClick={toggleProfileEditing}
            >cancel</p>                      
        </div>
    );
}

export default EditProfile;