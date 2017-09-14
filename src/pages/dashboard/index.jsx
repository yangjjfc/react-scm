import React, { Component } from 'react'
import { Switch, Route,browserHistory} from 'react-router-dom'
import { Layout, Menu } from 'element-react';
import App from '../app/App.js'
import Table from '../table/table'
import Auth from '../auth'
import './index.scss'
class Dashboard extends Component {
    onOpen() {

    }

    onClose() {

    }
    onSelect(index){
          this.props.history.push('/'+index)
    }
    render() {
        return (
            <div className="webview">
                <header>123</header>
                <div className="container">
                    <aside>
                         <Menu defaultActive="2" className="el-menu-vertical-demo" onSelect={this.onSelect.bind(this)}  onOpen={this.onOpen.bind(this)} onClose={this.onClose.bind(this)} theme="dark">
                            <Menu.SubMenu  title={<span><i className="el-icon-message"></i>导航一</span>}>
                                <Menu.Item index="index/1">选项1</Menu.Item>
                                <Menu.Item index="index/2">选项2</Menu.Item>
                                <Menu.Item index="index/3">选项3</Menu.Item>
                            </Menu.SubMenu>
                            <Menu.Item index="index"><i className="el-icon-menu"></i>导航二</Menu.Item>
                            <Menu.Item index="index"><i className="el-icon-setting"></i>导航三</Menu.Item>
                        </Menu>
                    </aside>
                    <section>
                        <browserHistory>
                            <Switch>
                                <Route exact path="/index/1" component={Auth} />
                                <Route  path="/index/2" component={Table} />
                                <Route  path="/index/3" component={App} />
                            </Switch>
                        </browserHistory>
                    </section>
                </div>
            </div>
        )
    }
}

export default Dashboard