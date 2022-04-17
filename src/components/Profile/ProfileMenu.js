import React, { useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import Logo from './logo.png';


const ProfileMenu = ({onRouteChange}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen(prevState => !prevState);
  

  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle className=' shadow-2 br-100 pa0 ma0' color='info'>
          <div className="tc">
            <img
                src={Logo}
                className="br-100 ba pa0 ma0 h3 w3 dib" alt="profile_picture"/>
          </div>
      </DropdownToggle>
      <DropdownMenu  right>
        <DropdownItem onClick={()=>onRouteChange('profile')}>Profile</DropdownItem>
        <DropdownItem onClick={()=>onRouteChange('signin')}>Sign out</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}

export default ProfileMenu;


