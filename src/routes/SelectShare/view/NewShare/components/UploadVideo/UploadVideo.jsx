import React, { Component } from 'react'
import style from './UploadVideo.scss'
import flowericon from 'assets/flowericon.png'
import book from 'assets/book.jpg'
  
export class UploadVideo extends Component {
constructor(props) {
  super(props);
  this.state = {
      videourl:null,
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
  
}
render() {
  return (
    <div className={style.ContentBox}>
        <div className={[style.Title,'childcenter childcontentstart'].join(' ')}>
            <img src={flowericon} className={style.TitleFlower} alt=""/>
            <div className={style.TitleValue}>请选择你要上传的演说视频</div>
        </div>
        <div className={[style.VideoBox,'childcenter'].join(' ')}>
            {this.state.videourl? <video src={this.state.videourl}></video>: <div className={style.AddIcon}></div> }
        </div>
        <div className={[style.Tips,'childcenter'].join(' ')}>请在这里选择您要上传的视频</div>
        <div className={[style.SVGbox,'childcenter'].join(' ')}>
            <svg width="280" height="280" className={style.ProgressSvg}>
                <text  x="50%" y="50%" fill="rgba(100,181,175,1)" fontSize='48' textAnchor='middle' dominantBaseline='middle'>50%</text >
                <circle cx="50%" cy="50%" r="120" stroke-width="12" stroke-linecap='round ' stroke="rgba(100,181,175,1)" fill="none" transform=" rotate(-90,140 140)" stroke-dasharray={754*0.5 +" 754"}></circle>
            </svg>
        </div>
        <div className={[style.ButtonGroup,'childcenter'].join(' ')}>
            <div className={[style.NextButton,style.ForwardButton,'childcenter'].join(' ')} >上一步</div>
            <div className={[style.NextButton,'childcenter'].join(' ')} >提交</div>
        </div>
    </div>
   )
   }
}
export default UploadVideo