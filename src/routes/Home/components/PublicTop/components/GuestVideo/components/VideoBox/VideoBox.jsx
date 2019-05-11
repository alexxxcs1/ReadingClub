import React, { Component } from 'react'
import style from './VideoBox.scss'

export class VideoBox extends Component {
constructor(props) {
  super(props);
  this.state = {
    isPlay:false,
    isFocus:false,
    cover:null,
    url:null,
    id:null,
  };
     this.refreshProps = this.refreshProps.bind(this);
     this.HandleReadyPlay = this.HandleReadyPlay.bind(this);
}
componentWillReceiveProps(nextprops) {
  this.refreshProps(nextprops);
}
componentDidMount() {
  this.refreshProps(this.props);
}
refreshProps(props) {
  if (!props.onFocus) {
    this.state.isPlay = false;
    this.refs.video.pause();
    this.refs.video.currentTime = 0;
  }
  this.state.isFocus = props.onFocus;
  this.state.url = props.data.video;
  this.state.cover = props.data.img;
  this.state.id = props.data.id;
  this.setState(this.state);
  
}
HandleReadyPlay(){
  if(!this.state.isFocus) return;
  this.state.isPlay = true;
  this.refs.video.play();
  this.setState(this.state);
}
render() {
  return (
    <div className={[style.VideoBox,this.state.isFocus?style.Focus:'','childcenter'].join(' ')} >
        
        <video src={this.state.url} ref='video' style={this.state.isFocus&&this.state.isPlay?{display:'block'}:{display:'none'}} preload controls="true" poster={this.state.cover} ref='video' className={style.video} onClick={(e)=>{e.target.play()}}></video>
        <img src={this.state.cover} style={!(this.state.isFocus&&this.state.isPlay)?{display:'block'}:{display:'none'}} className={style.poster} alt="" onClick={this.HandleReadyPlay}/>
    </div>
   )
   }
}
export default VideoBox