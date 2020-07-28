import React from 'react';
import Customers from '../customers';
import CustomerDetails from '../customer-details';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import './app.css';

const App = () => {
    return (
        <Router>
            <Switch>
                    <Redirect exact from="/" to="/customers" />
                    <Route exact path="/customers" component={Customers}/>
                    <Route path="/customer/id=:id" component={CustomerDetails}/>
            </Switch>
        </Router>
    );
};

export default App;