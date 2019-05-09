import React, { Component } from 'react'
import style from './BottomHandle.scss'

import supporticon from 'assets/supporticon.png'
import commenticon from 'assets/commenticon.png'
import forwardicon from 'assets/forwardicon.png'

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
     this.gotoComment = this.gotoComment.bind(this);
     this.setShareLike = this.setShareLike.bind(this);
     this.gotoForward = this.gotoForward.bind(this);
}
componentWillReceiveProps(nextprops) {
  this.refreshProps(nextprops);
}
componentDidMount() {
  this.refreshProps(this.props);
}
refreshProps(props) {
    if (JSON.stringify(this.state.data) === '{}') {
      this.state.data = props.data;
      this.setState(this.state);
    }
    
}
gotoComment(){
  let url = window.location.href;
  let urlarray = url.split('/');
  urlarray.fill('comment',urlarray.length-1);
  window.location.href = urlarray.join('/');
}
setShareLike(id){
  api.setShareLike(id).then(res=>{
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
  ShareBox(window.location.origin + '' + window.location.pathname + '/#/share/' + id,{
    type:'notes',
    id:id
  })
}
render() {
  return (
    <div className={[style.BottomHandle,'childcenter'].join(' ')}>
        <div className={[style.Button,'childcenter'].join(' ')} onClick={this.setShareLike.bind(this,this.state.data.id)}>
            <img src={supporticon}  className={this.state.data.is_like?style.Like:style.Unlike} alt=""/>点赞{this.state.data.likeNum}
        </div>
        <div className={[style.Button,'childcenter'].join(' ')} onClick={this.gotoComment}>
            <img src={commenticon} alt=""/>评论{this.state.data.commentNum}
        </div>
        <div className={[style.Button,'childcenter'].join(' ')} onClick={this.gotoForward.bind(this,this.state.data.id)}>
            <img src={forwardicon} alt=""/>转发{this.state.data.shareNum}
        </div>
    </div>
   )
   }
}
export default BottomHandle