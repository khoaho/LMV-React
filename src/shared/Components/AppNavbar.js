import React, { PropTypes } from 'react';
import {Nav} from 'react-bootstrap';
import {Modal} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import {Navbar} from 'react-bootstrap';
import {NavItem} from 'react-bootstrap';
import {MenuItem} from 'react-bootstrap';
import {NavDropdown} from 'react-bootstrap';
import {DropdownButton} from 'react-bootstrap';
import SpinningImg from 'SpinningImg';

export default class AppNavbar extends React.Component {

  /////////////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////////////
  render() {

    const {appState} = this.props;

    return (
      <Navbar className="navbar-lmv">
        <Navbar.Header>
          <Navbar.Brand>
            <img height="32" width="32" src="img/brand.png"/>
             <b>Autodesk</b> View & Data API
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>

        <Navbar.Collapse>

          <Nav pullRight>
            <NavItem eventKey={1} onSelect={this.logout}>
              <span className="glyphicon glyphicon-user" aria-hidden="true"></span>
               &nbsp; Logged in as {appState.user.name} (Lougout)
            </NavItem>
          </Nav>

        </Navbar.Collapse>
      </Navbar>
    );
  }

  /////////////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////////////
  logout(e) {

    $.ajax({
      url: '/api/authenticate/logout',
      type: 'POST',
      success: function (response) {
        console.log('Loggin out ...');
      },
      error: function (error) {
        console.log('Logout failed!');
        console.log(error);
      }
    });

    window.location.href = '/login';
  }
}