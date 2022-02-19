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
<<<<<<< HEAD
import { ItemInsert, Items, ItemUpdate, Admin } from './pages';
=======
import { ItemInsert, Items, ItemUpdate, Patients, Exams } from './pages';
>>>>>>> 7e99ed318aacf669149f973996813ac07c9a0f13

class App extends Component {
  render() {
    // TODO: maybe only need one route for Items?
    const publicViews = (
      <Switch>
        {/* <Route exact path={routes.HOME}>
          <Redirect to={routes.ITEMS} />
        </Route> */}
        <Route exact path={routes.ITEM_UPDATE} component={ItemUpdate} />
        <Route exact path={routes.HOME} component={Welcome} />
        <Route exact path={routes.ITEMS} component={Items} />
        <Route exact path={`${routes.ITEMS}/items-plain`} component={Items} />
        <Route exact path={`${routes.ITEMS}/react-table-v6`} component={Items} />
        <Route exact path={routes.ITEM_INSERT} component={ItemInsert} />
<<<<<<< HEAD
        <Route exact path={routes.Admin} component={Admin} />
=======
        <Route exact path={routes.PATIENTS} component={Patients} />
        <Route exact path={routes.EXAMS} component={Exams} />
>>>>>>> 7e99ed318aacf669149f973996813ac07c9a0f13
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
