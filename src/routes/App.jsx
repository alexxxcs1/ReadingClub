import React, { Component } from 'react';
import { HashRouter,Route,Switch} from 'react-router-dom';
import style from './App.scss'

import Home from 'routes/Home'
import Book from 'routes/Book'
import Share from 'routes/Share'
import Comment from 'routes/Comment'
import SelectShare from 'routes/SelectShare'

class App extends Component {
  render() {
    return (
      <div className={style.OutBox} >
        <HashRouter >
              <Switch>
                  
                  <Route path='/book/:id' component={Book} /> {/* id:书本id */}
                  <Route path='/share/:id' component={Share} /> {/* id:读书笔记id */}
                  <Route path='/comment/:id' component={Comment} /> {/* id:一级评论id */}
                  <Route path='/newshare' component={SelectShare} /> {/* id:一级评论id */}
                  {/* 首页 */}
                  <Route path='/' component={Home} />
                  
                    
              </Switch>
        </HashRouter>
      </div>
    );
  }
}

export default App;
