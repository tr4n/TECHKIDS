import React from 'react';
import { Navbar, Container, Input, NavbarBrand, Button, Modal, Form } from 'reactstrap';
import './Header.less';


const Header = (props) => {
  return (
    <Navbar color='light'  >
      <Container className="header-container">
        <Input style={{ display: 'inline-block', width: '30%' }} type='text' name='search-title' placeholder='Search something...' className="search" />
        <NavbarBrand href="/" > Techkids hotgirl </NavbarBrand>

        {
          props.authUser.userId ? (
            <div> Welcome, {props.authUser.username}</div>

          ) : (
              <div className="buttons">
                <Button style={{ width: 100, marginRight: 10 }} color="primary" onClick={props.login.toggle}>Login</Button>
                <Button color="danger">Register</Button>
              </div>
            )
        }


        <Modal className="login-modal" isOpen={props.loginModalVisible} toggle={props.login.toggle}>
          <Form onSubmit={props.login.submitForm}>
            <Input type='text'
              placeholder='username'
              value={props.login.username}
              onChange={(event) => props.login.loginInfoChange({ username: event.target.value })}
            />
            <Input type='password'
              placeholder='password'
              value={props.login.password}
              onChange={(event) => props.login.loginInfoChange({ password: event.target.value })}
            />
            <Input type='submit' value="Login" />
            <Button onClick={props.login.loginWithFacebook}> Continue with Facebook</Button>
          </Form>

        </Modal>
      </Container>
    </Navbar>
  )
}

export default Header;

