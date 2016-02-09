import React, { PropTypes } from 'react';
import {Nav} from 'react-bootstrap';
import {Navbar} from 'react-bootstrap';
import {NavItem} from 'react-bootstrap';
import {NavDropdown} from 'react-bootstrap';
import {MenuItem} from 'react-bootstrap';
import {DropdownButton} from 'react-bootstrap';
import {Modal} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import SpinningImg from './SpinningImg';

class AppNavbar extends React.Component {

    /////////////////////////////////////////////////////////////////
    //
    //
    /////////////////////////////////////////////////////////////////
    constructor() {

        super();

        this.navToView = this.navToView.bind(this);
        this.showAbout = this.showAbout.bind(this);
        this.hideAbout = this.hideAbout.bind(this);
    }

    /////////////////////////////////////////////////////////////////
    //
    //
    /////////////////////////////////////////////////////////////////
    componentWillMount() {

        this.setState({
            showAbout: false
        });
    }

    /////////////////////////////////////////////////////////////////
    //
    //
    /////////////////////////////////////////////////////////////////
    render() {

        const { navbar } = this.props;

        return (

            <div>
                <Navbar>
                    <a className="navbar-brand">
                        <SpinningImg src="assets/adsk/adsk-32x32-32.png"
                            width="32" height="32" className="navbar-img"/>
                        Autodesk
                    </a>
                    <Nav>

                        <NavItem className={navbar.activeView == 'home' ? 'active' : ''}
                            eventKey={1} href="home"
                            onClick={this.navToView}>
                            Home
                        </NavItem>

                        <NavItem className={navbar.activeView == 'gallery' ? 'active' : ''}
                            eventKey={2} href="gallery"
                            onClick={this.navToView}>
                            Gallery
                        </NavItem>

                        <NavItem className={navbar.activeView == 'viewer' ? 'active' : ''}
                            eventKey={3} href="viewer"
                            onClick={this.navToView}>
                            Viewer
                        </NavItem>

                    </Nav>

                    <Nav pullRight>
                        <NavDropdown id="nav-dropdown" eventKey={3} title="About">
                            <MenuItem eventKey={3.1}
                                      href="http://developer.autodesk.com"
                                      target="_blank">
                                Get an API key
                            </MenuItem>
                            <MenuItem eventKey={3.2}
                                      href="http://forums.autodesk.com/t5/Web-Services-API/ct-p/94"
                                      target="_blank">
                                API Support
                            </MenuItem>
                            <MenuItem eventKey={3.3}
                                      href="https://github.com/Developer-Autodesk/lmv-react"
                                      target="_blank">
                                Source on Github
                            </MenuItem>
                            <MenuItem divider/>
                            <MenuItem eventKey={3.4} onSelect={this.showAbout}>
                                About that sample ...
                            </MenuItem>
                        </NavDropdown>
                    </Nav>
                </Navbar>

                <Modal show={this.state.showAbout} onHide={this.hideAbout}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h4>Text in a modal</h4>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.hideAbout}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }

    /////////////////////////////////////////////////////////////////
    //
    //
    /////////////////////////////////////////////////////////////////
    navToView(e) {

       var splits = e.target.href.split('/');

       var view = splits[splits.length-1];

       this.props.flux.getActions(
           'appState').setActiveView(view);
    }

    /////////////////////////////////////////////////////////////////
    //
    //
    /////////////////////////////////////////////////////////////////
    showAbout(e) {

        this.state.showAbout = true;

        this.setState(this.state);
    }

    /////////////////////////////////////////////////////////////////
    //
    //
    /////////////////////////////////////////////////////////////////
    hideAbout(e) {

        this.state.showAbout = false;

        this.setState(this.state);
    }
}

export default AppNavbar;
