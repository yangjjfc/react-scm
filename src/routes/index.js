import { Switch, Route,browserHistory} from 'react-router-dom'
import React from 'react'
import App from '../pages/app/App.js'
import Table from '../pages/table/table'
import Auth from '../pages/auth'
import Dashboard from '../pages/dashboard'

const Routes = (
    <browserHistory>
        <Switch>
            <Route exact path="/" component={Auth} />
            <Route  path="/123" component={Table} />
            <Route  path="/index" component={Dashboard} />
        </Switch>
    </browserHistory>
)
export default Routes