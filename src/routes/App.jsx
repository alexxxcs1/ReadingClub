import React, { Component } from 'react';
import { HashRouter,Route,Switch} from 'react-router-dom';
import style from './App.scss'

import Home from 'routes/Home'
import Book from 'routes/Book'

class App extends Component {
  render() {
    return (
      <div className={style.OutBox} >
        <HashRouter >
              <Switch>
                  
                  <Route path='/book/:id' component={Book} />
                  {/* 首页 */}
                  <Route path='/' component={Home} />
                  
                    
              </Switch>
        </HashRouter>
      </div>
    );
  }
}

export default App;
