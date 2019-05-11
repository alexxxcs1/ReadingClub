import React, { Component } from 'react'
import style from './BottomHandle.scss'
import PropTypes from "prop-types";

import commenticon from 'assets/commenticon.png'

import NewComment from '../NewComment'
import  MessageSystem  from 'components/MessageSystem';

import getIsRegister from 'common/getIsRegister'
  
export class BottomHandle extends Component {
constructor(props) {
  super(props);
  this.state = {
    userinfo:{},
  };
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
  this.state.userinfo = props.data;
  this.setState(this.state);
}
createNewComment(){
  this.context.HandleVideoStatus(false);
  let a = getIsRegister(window.location.href).then(res=>{
    if (res) {
      if (JSON.stringify(this.state.userinfo) === '{}') {
        MessageSystem.message({
          message:'加载中，请稍后',
        });
        this.context.HandleVideoStatus(true);
        return 
      }
      let self = this;
      NewComment({
        data:this.state.userinfo,
      },(reply)=>{
        this.context.HandleVideoStatus(true);
        if (reply) {
          this.props.onUpdate(reply);
        }
      });
    }else{
      MessageSystem.message({
        message:'请先注册',
      });
      this.context.HandleVideoStatus(true);
    }
    
  });
  
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
BottomHandle.contextTypes = {
  HandleVideoStatus: PropTypes.func
};
export default BottomHandle