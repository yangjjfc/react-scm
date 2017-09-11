import { Switch, Route } from 'react-router-dom'
import React from 'react'
import App from '../pages/app/App.js'
import Table from '../pages/table/table'
import Auth from '../pages/auth'

const Routes = (
    <Switch>
        <Route exact path="/" component={Auth} />
        <Route  path="/123" component={Table} />
    </Switch>
)
export default Routes