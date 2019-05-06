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
     this.gotoComment = this.gotoComment.bind(this);
}
componentWillReceiveProps(nextprops) {
  this.refreshProps(nextprops);
}
componentDidMount() {
  this.refreshProps(this.props);
}
refreshProps(props) {
  
}
gotoComment(){
  let url = window.location.href;
  let urlarray = url.split('/');
  urlarray.fill('comment',urlarray.length-1);
  window.location.href = urlarray.join('/');
}
render() {
  return (
    <div className={[style.BottomHandle,'childcenter'].join(' ')}>
        <div className={[style.Button,'childcenter'].join(' ')}>
            <img src={supporticon} alt=""/>点赞1290
        </div>
        <div className={[style.Button,'childcenter'].join(' ')} onClick={this.gotoComment}>
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