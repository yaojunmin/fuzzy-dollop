import React, { Component } from 'react';
import logo from './logo.svg';
// import './App.css';
import './App.scss';

class App extends Component {
    constructor(props){
     super(props);
        this.state = {
            navList: [
                {
                    name: '网站首页',
                    id: 1
                },
                {
                    name: '关于我',
                    id: 2
                },
                {
                    name: '博客日记',
                    id: 3
                },
                {
                    name: '模板分享',
                    id: 4
                },
                {
                    name: '学无止境',
                    id: 5
                },
                {
                    name: '慢生活',
                    id: 6
                },
                {
                    name: '留言',
                    id: 7
                }
            ]
        }
    }
  render() {
      const navList = this.state.navList.map(item => {
          return (
              <li className="item" key={item.id}>{item.name}</li>
          )
      });
    return (
      // <div className="App">
      //   <header className="App-header">
      //     <img src={logo} className="App-logo" alt="logo" />
      //     <h1 className="App-title">Welcome to React</h1>
      //   </header>
      //   <p className="App-intro">
      //     是是是To get started, edit <code>src/App.js</code> and save to reload.
      //   </p>
      // </div>
        <div className="App">
          <header className="App-header">
              <div className="App-title">
                  <img src={logo} className="App-logo" alt="logo" />
                  <h1 className="App-title">姚俊敏个人博客</h1>
              </div>
              <nav className="App-nav">
                  {navList}
              </nav>
          </header>
          <article className="App-main">
              <section className="App-section"></section>
              <aside className="App-aside"></aside>
          </article>
        </div>
    );
  }
}

export default App;
