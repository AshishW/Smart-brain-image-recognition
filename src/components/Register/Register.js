import React from "react";

class Register extends React.Component{
    constructor(props){
        super(props);
        this.state={
            registerName:'',
            registerEmail:'',
            registerPassword:'',
        }
    }
    onNameChange=(event)=>{
        this.setState({registerName: event.target.value})
    }
    onEmailChange=(event)=>{
        this.setState({registerEmail:event.target.value})
    }
    onPasswordChange=(event)=>{
        this.setState({registerPassword:event.target.value})
    }
    onRegister=()=>{
        const {registerName, registerEmail, registerPassword} = this.state;
        const {onRouteChange} = this.props;
        if((!registerName || !registerEmail || !registerPassword)){
            alert('invalid form submission')
        }else if(registerPassword.length < 8){
            alert('please enter strong password with atleast 8 characters with uppercase, lowercase and special characters')
        }
        else{
            onRouteChange('loadingScreen')
            fetch(`https://intense-sea-48271.herokuapp.com/register`,{
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    name: registerName,
                    email: registerEmail,
                    password: registerPassword
                })
            })
            .then(res=> res.json())
            .then(data=>{
                if( data && data.userId){
                    this.props.saveAuthTokenToSession(data.token)
                    this.props.getProfileAndLoadUser(data.userId, data.token)
                }else{
                    onRouteChange('register')
                }
            }).catch(err => console.log('registation error'))
        }
    }
    render(){
        return(
            <div className="br2 ba shadow-5 b--black-10 mv4 w-80 w-50-m w-25-l mw6 center">
                <div className="pa4 black-80">
                    <div className="measure center">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f2 fw6 ph0 mh0">Register</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                            <input 
                              className="pa2 input-reset ba bg-transparent  hover-white w-100"
                              type="text" 
                              name="name"  
                              id="name"
                              onChange={this.onNameChange}
                              />
                        </div>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input 
                              className="pa2 input-reset ba bg-transparent  hover-white w-100" 
                              type="email" 
                              name="email-address"  
                              id="email-address"
                              onChange={this.onEmailChange}
                              />
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input 
                              className="b pa2 input-reset ba bg-transparent  hover-white w-100" 
                              type="password" 
                              name="password"  
                              id="password"
                              onChange={this.onPasswordChange}
                              />
                        </div>
                        </fieldset>
                        <div className="">
                        <input 
                          onClick={this.onRegister}
                          className="b ph3 pv2 w-60 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Register"/>
                        </div>
                        <div className="lh-copy mt3">
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default Register;