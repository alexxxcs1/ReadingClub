import React, { Component } from 'react'
import style from './UploadVideo.scss'
import flowericon from 'assets/flowericon.png'
import book from 'assets/book.jpg'
import MessageSystem from 'components/MessageSystem'
import ShareBox from 'components/ShareBox'


import {api} from 'common/app'
  
export class UploadVideo extends Component {
constructor(props) {
  super(props);
  this.state = {
      onAjax:false,
      videopost:null,
      uploadProgress:0,
      bookdata:{},
  };
  this.refreshProps = this.refreshProps.bind(this);
  this.HandleFileUpload = this.HandleFileUpload.bind(this);
  this.Beforestep = this.Beforestep.bind(this);
  this.Submit = this.Submit.bind(this);
}
componentWillReceiveProps(nextprops) {
  this.refreshProps(nextprops);
}
componentDidMount() {
  this.refreshProps(this.props);
}
refreshProps(props) {
  this.setState({
    bookdata:props.data,
  })
}
HandleFileUpload(e){
  let file = e.target.files[0];
  let formdata = new FormData();
  formdata.append('file',file);
  formdata.append('type','video');
  e.target.value = '';
  api.uploadFile(formdata,(progressEvent)=>{
    var complete = (progressEvent.loaded / progressEvent.total);
      this.state.uploadProgress = Math.min(complete,0.9);
      this.setState(this.state);
  }).then(res=>{
    console.log(res);
    if (res.code == 200) {
      this.state.bookdata.video = res.data.url;
      this.setState({
        uploadProgress:1,
        bookdata:this.state.bookdata,
        videopost:res.data.cover,
      })
    }else{
      this.setState({
        uploadProgress:0,
      })
      MessageSystem.message({
        message:res.msg
      })
    }
  },err=>{
    console.log(err);
  })
}
Beforestep(){
  let json = JSON.parse(JSON.stringify(this.state.bookdata));
  this.props.onStepChange(-1,json);
}
Verify(){
  if (this.state.bookdata.video) {
      return true;
  }else{
      MessageSystem.message({
          message:'请上传你的演说视频'
      });
      return false;
  }
}
Submit(){
  let submitobj = JSON.parse(JSON.stringify(this.state.bookdata));
  submitobj.content = submitobj.type == 1?submitobj.text_content:submitobj.image_content;
  if (this.state.onAjax) return;
  this.setState({
    onAjax:true,
  })
  api.SubmitBookShare(submitobj).then(res=>{
    if (res.code === 200) {
      // MessageSystem.message({
      //   message:res.msg
      // });
      ShareBox(window.location.href,{
        type:'newnote',
        id:res.data.id
      })
      window.location.hash = '#share/'+res.data.id;
    }else{
      MessageSystem.message({
        message:res.msg
      });
    }
    this.setState({
      onAjax:false,
    })
  },err=>{
    console.log(err);
    
  })
}
render() {
  return (
    <div className={style.ContentBox}>
        <div className={[style.Title,'childcenter childcontentstart'].join(' ')}>
            <img src={flowericon} className={style.TitleFlower} alt=""/>
            <div className={style.TitleValue}>请选择你要上传的演说视频</div>
        </div>
        <div className={[style.VideoBox,'childcenter'].join(' ')}>
            {this.state.bookdata.video?<video src={this.state.bookdata.video} controls={true} poster={this.state.videopost?this.state.videopost:''}></video>: <div className={style.AddIcon} onClick={()=>{this.refs.file.click()}}></div> }
            <input type="file" style={{display:'none'}} ref='file' onChange={this.HandleFileUpload}/>
        </div>
        {this.state.bookdata.video?
          (<div className={[style.ReUpload,'childcenter'].join(' ')}>
            <span onClick={()=>{this.refs.file.click()}}>重新选择</span>
          </div>)
        :
        (<div className={[style.Tips,'childcenter'].join(' ')}>请点击上方“+”选择需要上传的视频，视频时长不超过3分钟，文件控制在30M以内噢</div>)}
        {this.state.uploadProgress==0?'': <div className={[style.SVGbox,'childcenter'].join(' ')}>
            <svg width="280" height="280" className={style.ProgressSvg}>
                <text  x="50%" y="50%" fill="rgba(100,181,175,1)" fontSize='48' textAnchor='middle' dominantBaseline='middle'>{Math.round(this.state.uploadProgress*100)}%</text >
                <circle cx="50%" cy="50%" r="120" stroke-width="12" stroke-linecap='round ' stroke="rgba(100,181,175,1)" fill="none" transform=" rotate(-90,140 140)" strokeDasharray={754*this.state.uploadProgress +" 754"}></circle>
            </svg>
        </div>}
        
        <div className={[style.ButtonGroup,'childcenter'].join(' ')}>
            <div className={[style.NextButton,style.ForwardButton,'childcenter'].join(' ')} onClick={this.Beforestep}>上一步</div>
            <div className={[style.NextButton,'childcenter'].join(' ')} onClick={this.Submit}>{this.state.onAjax?'提交中...':'提交'}</div>
        </div>
    </div>
   )
   }
}
export default UploadVideo