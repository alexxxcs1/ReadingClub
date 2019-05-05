import React, { Component } from 'react'
import style from './DarkMask.scss'
  
export class DarkMask extends Component {
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
}
refreshProps(props) {
  
}
render() {
  return (
    <div className={style.darkmask} ref={'darkmask'}>
        {this.props.children}
    </div>
   )
   }
}
export default DarkMask