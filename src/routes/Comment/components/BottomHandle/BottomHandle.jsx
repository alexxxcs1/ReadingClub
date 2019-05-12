import React, { Component } from 'react'
import style from './BottomHandle.scss'

import supporticon from 'assets/supporticon.png'
import commenticon from 'assets/commenticon.png'
import forwardicon from 'assets/forwardicon.png'

import NewComment from '../NewComment'
import {api} from 'common/app'
import MessageSystem from 'components/MessageSystem'

import ShareBox from 'components/ShareBox'

export class BottomHandle extends Component {
constructor(props) {
  super(props);
  this.state = {
    data:{},
  };
     this.refreshProps = this.refreshProps.bind(this);
     this.SendNewComment = this.SendNewComment.bind(this);
     this.setShareLike = this.setShareLike.bind(this);
}
componentWillReceiveProps(nextprops) {
  this.refreshProps(nextprops);
}
componentDidMount() {
  this.refreshProps(this.props);
}
refreshProps(props) {
  this.state.data=props.data;
  this.setState(this.state);
}
SendNewComment(){
  NewComment(this.state.data,(value)=>{
    console.log(value);
    
    this.setState({
      commentNum:parseInt(this.state.data.commentNum)+1
    });
    this.props.onUpdata(value);
  });
}
setShareLike(id){
  api.setCommentLike(id).then(res=>{
    if (res.code === 200) {
      MessageSystem.message({
        message:res.msg
      })
      this.state.data.is_like = res.data.is_like;
      this.state.data.likeNum = res.data.likeNum;
      this.setState(this.state);
    }else{
      MessageSystem.message({
        message:res.msg
      })
    }
  },err=>{
    console.log(err);
  })
}
gotoForward(id){
  ShareBox(window.location.href,{
    type:'comment',
    id:id
  })
}
render() {
  return (
    <div className={[style.BottomHandle,'childcenter'].join(' ')}>
        <div className={[style.Button,'childcenter'].join(' ')} onClick={this.setShareLike.bind(this,this.state.data.id)}>
            <img src={supporticon}  className={this.state.data.is_like?style.Like:style.Unlike} alt=""/>点赞{this.state.data.likeNum}
        </div>
        <div className={[style.Button,'childcenter'].join(' ')} onClick={this.SendNewComment}>
            <img src={commenticon} alt=""/>写评论{this.state.data.commentNum}
        </div>
        <div className={[style.Button,'childcenter'].join(' ')} onClick={this.gotoForward.bind(this,this.state.data.id)}>
            <img src={forwardicon} alt=""/>转发{this.state.data.shareNum}
        </div>
    </div>
   )
   }
}
export default BottomHandle