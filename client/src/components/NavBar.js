import React, { Component } from 'react';
import styled from 'styled-components';
//import {  BrowserRouter as Router,  Routes,  Route} from "react-router-dom";

import Links from './Links';

const Container = styled.div.attrs({
  className: 'container',
})`
  max-width: 100%;
  padding-left: 0px;
  padding-right: 0px;
`;

const Nav = styled.nav.attrs({
  className: 'navbar navbar-expand-lg navbar-dark bg-dark',
})`
  margin-bottom: 20px;

  @media screen and (min-width: 992px) {
    padding: 0.5em 25%;
  }
`;

const navBarItems = [
  {
    name: 'Home Page',
    toPathname: '/items',
    className: 'nav-link',
  },
  {
    name: 'Patients',
    toPathname: '/patients',
    className: 'nav-link',
  },
  {
    name: 'Exams',
    toPathname: '/item/exams',
    className: 'nav-link',
  },
  {
    name: 'Admin',
    toPathname: '/admin',
    className: 'nav-link',
  },
  /*{
    name: 'Create Item',
    name: 'Create Patient',
    toPathname: '/item/create',
    className: 'nav-link',
  },
  {
    name: 'Exams',
    toPathname: '/item/exams',
    className: 'nav-link',
  }*/
];

class NavBar extends Component {
  render() {
    return (
      <Container>
        <Nav>
          <Links navBarItems={navBarItems} />
        </Nav>
      </Container>
    );
  }
}

export default NavBar;
