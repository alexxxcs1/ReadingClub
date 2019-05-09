import React, { Component } from 'react'
import style from './SelectShare.scss'
import { Route, Switch ,Link ,Redirect} from "react-router-dom";
import SelectBook from './view/SelectBook'
import NewShare from './view/NewShare'
import shareconfig from 'common/shareconfig'
import getIsRegister from 'common/getIsRegister'

export class SelectShare extends Component {
constructor(props) {
  super(props);
  this.state = {};
     this.refreshProps = this.refreshProps.bind(this);
}
componentWillReceiveProps(nextprops) {
  this.refreshProps(nextprops);
}
componentDidMount() {
  this.refreshProps(this.props);
  shareconfig(window.location.origin);
  getIsRegister(window.location.href);
}
refreshProps(props) {
  
}
render() {
  return (
    <div className={style.SelectShare}>
        <Switch>
            <Route path='/newshare/select' component={SelectBook} /> 
            <Route path='/newshare/book/:id' component={NewShare} /> 
            <Redirect to='/newshare/select'/>
        </Switch>
    </div>
   )
   }
}
export default SelectShare