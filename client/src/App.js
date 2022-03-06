import React, { Component } from 'react';

// eslint-disable-next-line
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

// Constants
import { routes } from './constants';

// Styles
import { CssBaseline } from '@material-ui/core';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/App.css';

// Static/Stateless
import { NavBar, Welcome } from './components';

// Pages
import { ItemInsert, Items, ItemUpdate, Admin, Exams, Patients} from './pages';

class App extends Component {
  render() {
    // TODO: maybe only need one route for Items?
    const publicViews = (
      <Switch>
        <Route exact path={routes.HOME}>
          <Redirect to={routes.ITEMS} />
        </Route> 
        <Route exact path={routes.ITEM_UPDATE} component={ItemUpdate} />
        <Route exact path={routes.HOME} component={Welcome} />
        <Route exact path={routes.ITEMS} component={Items} />
        <Route exact path={`${routes.ITEMS}/items-plain`} component={Items} />
        <Route exact path={`${routes.ITEMS}/react-table-v6`} component={Items} />
        <Route exact path={routes.ITEM_INSERT} component={ItemInsert} />
        <Route exact path={routes.ADMIN} component={Admin} />
        <Route exact path={routes.EXAMS} component={Exams} />
        <Route exact path={routes.PATIENTS} component={Patients} />
      </Switch>
    );

    return (
      <BrowserRouter>
        <CssBaseline />
        <NavBar />
        <div className="app--main">
          <div className="view-container">{publicViews}</div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
