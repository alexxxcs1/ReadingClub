import React, { Component } from 'react'
import style from './VideoBox.scss'

export class VideoBox extends Component {
constructor(props) {
  super(props);
  this.state = {
    isFocus:false,
    cover:null,
    url:null,
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
  this.state.isFocus = props.onFocus;
  this.state.url = props.data.url;
  this.state.cover = props.data.kv;
  this.state.id = props.data.id;
  this.setState(this.state);
}
render() {
  return (
    <div className={[style.VideoBox,this.state.isFocus?style.Focus:'','childcenter'].join(' ')} >
        {this.state.isFocus?
        <video src={this.state.url} preload controls="true" poster={this.state.cover} ref='video' className={style.video} onClick={(e)=>{e.target.play()}}></video>
        :
        <img src={this.state.cover} className={style.poster} alt=""/>
        }
    </div>
   )
   }
}
export default VideoBox