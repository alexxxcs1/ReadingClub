import React, { Component } from 'react'
import style from './BottomHandle.scss'

import commenticon from 'assets/commenticon.png'

import NewComment from '../NewComment'
  
export class BottomHandle extends Component {
constructor(props) {
  super(props);
  this.state = {};
     this.refreshProps = this.refreshProps.bind(this);
     this.createNewComment = this.createNewComment.bind(this);
}
componentWillReceiveProps(nextprops) {
  this.refreshProps(nextprops);
}
componentDidMount() {
  this.refreshProps(this.props);
}
refreshProps(props) {
  
}
createNewComment(){
  NewComment();
}
render() {
  return (
    <div className={[style.BottomHandle,'childcenter'].join(' ')}>
        <div className={[style.Button,'childcenter'].join(' ')} onClick={this.createNewComment}>
            <img src={commenticon} alt=""/>写评论
        </div>
    </div>
   )
   }
}
export default BottomHandle