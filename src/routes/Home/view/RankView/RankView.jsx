import React, { Component } from 'react'
import style from './RankView.scss'
  
export class RankView extends Component {
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
    <div className={style.ViewBox}>
      <div className={style.RankView}></div>
    </div>
   )
   }
}
export default RankView