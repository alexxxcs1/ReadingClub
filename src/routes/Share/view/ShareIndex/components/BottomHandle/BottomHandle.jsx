import React, { Component } from 'react'
import style from './BottomHandle.scss'

import supporticon from 'assets/supporticon.png'
import commenticon from 'assets/commenticon.png'
import forwardicon from 'assets/forwardicon.png'
  
export class BottomHandle extends Component {
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
    <div className={[style.BottomHandle,'childcenter'].join(' ')}>
        <div className={[style.Button,'childcenter'].join(' ')}>
            <img src={supporticon} alt=""/>点赞1290
        </div>
        <div className={[style.Button,'childcenter'].join(' ')}>
            <img src={commenticon} alt=""/>评论8
        </div>
        <div className={[style.Button,'childcenter'].join(' ')}>
            <img src={forwardicon} alt=""/>转发80
        </div>
    </div>
   )
   }
}
export default BottomHandle