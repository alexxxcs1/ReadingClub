import React, { Component } from 'react'
import { Route, Switch ,Link ,Redirect} from "react-router-dom";
import style from './Share.scss'
import {api} from 'common/app'
import shareconfig from 'common/shareconfig'
import PropTypes from "prop-types";

import ShareIndex from './view/ShareIndex'
import Comment from './view/Comment'
  
export class Share extends Component {
constructor(props) {
  super(props);
  this.state = {
      id:null,
      child:null,
      video:{},
      videostatus:true,
  };
     this.refreshProps = this.refreshProps.bind(this);
     this.getShareDetail_Video = this.getShareDetail_Video.bind(this);
     this.HandleVideoStatus = this.HandleVideoStatus.bind(this);
}
componentWillReceiveProps(nextprops) {
  this.refreshProps(nextprops);
}
componentDidMount() {
  this.refreshProps(this.props);
  
}
getChildContext() {
  return {
    HandleVideoStatus:this.HandleVideoStatus,
  };
}
refreshProps(props) {
    let child = window.location.href.split('/');
    child = child[child.length-1];
    if (child != this.state.child) {
      this.refs.shareview.scrollTop = 0;
      this.refs.shareview.pageYOffset = 0;
    }
    let id = props.match.params.id;
    if (id!=this.state.id) {
      this.getShareDetail_Video(id);
    }
    this.state.id = id;
    this.setState({
        id:id,
        child:child
    });
    shareconfig(window.location.href,{
      type:'notes',
      id:id
    });
}
getShareDetail_Video(id){
  api.getShareDetail_Video(id).then(res=>{
    console.log(res);
    if (res.code === 200) {
      this.state.video = res.data;
      this.setState({
        video:this.state.video,
      })
    }else{

    }
  },err=>{
    console.log(err);
    
  });
}
HandleVideoStatus(boolean){
  this.setState({
    videostatus:boolean,
  })
}
render() {
  return (
    <div className={style.ShareView} ref='shareview'>
        <div className={[style.VideoBox,'childcenter'].join(' ')} style={{'--backgroundImage':'url('+(this.state.video.cover?this.state.video.cover:'')+')'}}>
            <video src={this.state.video.video?this.state.video.video:''} style={this.state.videostatus?{display:'block'}:{display:'none'}} poster={this.state.video.cover?this.state.video.cover:''} preload controls="true" poster={null} ref='video' className={style.video} onClick={(e)=>{e.target.play()}}></video>
        </div>
        <div className={style.ChildBox}>
            <div className={[style.NavBox,'childcenter'].join(' ')}>
                <Link to={'/share/'+this.state.id+'/index'}><div className={[style.NavButton,this.state.child == 'index'?style.actButton:'','childcenter'].join(' ')} >读书笔记</div></Link>
                <Link to={'/share/'+this.state.id+'/comment'}><div className={[style.NavButton,this.state.child == 'comment'?style.actButton:'','childcenter'].join(' ')} >评论区</div></Link>
            </div>
            <div className={style.ChildRoute}>
                <Switch>
                  <Route path='/share/:id/index' component={ShareIndex} />
                  <Route path='/share/:id/comment' component={Comment} />
                  <Redirect from='/share/:id' to='/share/:id/index'/>
                </Switch>
            </div>
        </div>
    </div>
   )
   }
}
Share.childContextTypes = {
  HandleVideoStatus: PropTypes.func
};
export default Share