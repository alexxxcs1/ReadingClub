import React, { Component } from 'react'
import { Route, Switch ,Link ,Redirect} from "react-router-dom";
import style from './Share.scss'

import ShareIndex from './view/ShareIndex'
import Comment from './view/Comment'
  
export class Share extends Component {
constructor(props) {
  super(props);
  this.state = {
      id:null,
  };
     this.refreshProps = this.refreshProps.bind(this);
}
componentWillReceiveProps(nextprops) {
  this.refreshProps(nextprops);
}
componentDidMount() {
  this.refreshProps(this.props);
}
refreshProps(props) {
    let child = window.location.href.split('/');
    child = child[child.length-1];
    this.setState({
        id:props.match.params.id,
        child:child
    });
}
render() {
  return (
    <div className={style.ShareView}>
        <div className={style.VideoBox}>
            <video src={'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4'} preload controls="true" poster={null} ref='video' className={style.video} onClick={(e)=>{e.target.play()}}></video>
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
export default Share