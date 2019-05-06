import React, { Component } from 'react'
import style from './NewShare.scss'
  
export class NewShare extends Component {
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
    <div>
    NewShare
    </div>
   )
   }
}
export default NewShare