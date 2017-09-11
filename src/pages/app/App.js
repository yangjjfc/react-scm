import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import logo from './logo.svg';
import './App.scss';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <ul>
        <li><Link to="/">首页</Link></li>
        <li><Link to="/123">关于</Link></li>
        <li><Link to="/321">主题列表</Link></li>

        </ul>
      </div>
    );
  }
}

export default App;
