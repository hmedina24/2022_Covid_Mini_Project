import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';

import { routes } from '../constants';

import { Button } from '@material-ui/core';
import styled from 'styled-components';

import { ItemsList, ItemsPlain, ItemsTable } from '../pages';

const LinksGridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr [col-start]);
  margin-bottom: 1em;
  min-height: 30px;
  padding: 1em;
  width: 100%;
`;

const LinkGridWrapper = styled.div``;

const isCurrentPage = linkPathname => {
  return window.location.pathname === linkPathname;
};

const linkTextColor = linkPathname => {
  return isCurrentPage(linkPathname) ? '#FFFFFF' : 'rgba(255,255,255,.75)';
};


class Exams extends Component {
  render() {
    // TODO: would be better to dynamically create the routes based on page variations
    return (
      <>
      <p>Hello World!</p>
      </>
    );
  }
}

export default Exams;

