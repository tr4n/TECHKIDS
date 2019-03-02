import React from 'react';
import { Navbar, Container, Input, NavbarBrand, Button } from 'reactstrap';
import './Header.less';


const Header = (props) => {
  return (
    <Navbar color='light'  >
      <Container className="header-container">
        <Input style={{display: 'inline-block', width: '30%'}}type='text' name='search-title' placeholder='Search something...' className="search" />
        <NavbarBrand href="/" > Techkids hotgirl </NavbarBrand>
        <div className="buttons">
          <Button style={{width: 100, marginRight: 10}}color="primary">Login</Button>
          <Button color="danger">Register</Button>
        </div>

      </Container>
    </Navbar>
  )
}

export default Header;

