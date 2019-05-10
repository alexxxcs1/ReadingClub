import React, { Component } from 'react'
import style from './FillShareInfo.scss'
import flowericon from 'assets/flowericon.png'
import book from 'assets/book.jpg'
import {Link} from 'react-router-dom';
import MessageSystem from 'components/MessageSystem'
import LongImageView from 'components/LongImageView'
import {api} from 'common/app'
  
export class FillShareInfo extends Component {
constructor(props) {
  super(props);
  this.state = {
      uploadProgress:0,
      shareType:1,
      bookdata:{},
  };
  this.refreshProps = this.refreshProps.bind(this);
  this.HandleShareType = this.HandleShareType.bind(this);
  this.HandleTextValue = this.HandleTextValue.bind(this);
  this.Nextstep = this.Nextstep.bind(this);
  this.Beforestep = this.Beforestep.bind(this);
  this.onInputChange = this.onInputChange.bind(this);
  this.Verify = this.Verify.bind(this);
  this.onInputBlur = this.onInputBlur.bind(this);
  this.onUploadImage = this.onUploadImage.bind(this);
}
componentWillReceiveProps(nextprops) {
  this.refreshProps(nextprops);
}
componentDidMount() {
  this.refreshProps(this.props);
}
refreshProps(props) {
  this.setState({
    bookdata:JSON.stringify(this.state.bookdata)==='{}'?props.data:this.state.bookdata,
    shareType:props.data.type?props.data.type:this.state.shareType,
    maxpage:parseInt(props.maxpage),
  })
}
HandleShareType(type){
    this.setState({
        shareType:type
    });
}
HandleTextValue(e){
    this.setState({
        textValue:e.target.value,
    })
}
Nextstep(){
  console.log(this.state.bookdata);
  
  if (this.Verify()) {
      let json = JSON.parse(JSON.stringify(this.state.bookdata));
      json.type = this.state.shareType;
      this.props.onStepChange(1,json);
    }
}
Beforestep(){
    let json = JSON.parse(JSON.stringify(this.state.bookdata));
    json.type = this.state.shareType;
    this.props.onStepChange(-1,json);
}
onInputChange(type,e){
    this.state.bookdata[type] = e.target.value;
    this.setState(this.state)
}
onUploadImage(e){
  let file = e.target.files[0];
  let formdata = new FormData();
  formdata.append('file',file);
  formdata.append('type','img');
  e.target.value = '';
  api.uploadFile(formdata,(progressEvent)=>{
    var complete = (progressEvent.loaded / progressEvent.total);
      this.state.uploadProgress = Math.min(complete,0.9);
      this.setState(this.state);
  }).then(res=>{
    if (res.code == 200) {
      this.state.bookdata.image_content = res.data.url;
      this.setState({
        uploadProgress:1,
        bookdata:this.state.bookdata,
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
Verify(){
    let uploadcontent = this.state.shareType==1?this.state.bookdata.text_content:this.state.bookdata.image_content;
    console.log('----',this.state.bookdata);
    
    if (this.state.bookdata.title&&this.state.bookdata.pageNum&&uploadcontent) {
        if (this.state.bookdata.title.length<5) {
          MessageSystem.message({
            message:'读书笔记标题不低于五个字'
          })
          return false;
        }
        if (this.state.bookdata.pageNum>this.state.maxpage) {
          MessageSystem.message({
            message:'超过书籍最大页数'
          })
          return false;
        }
        if (this.state.shareType == 1) {
          if (this.state.bookdata.text_content.length<50||this.state.bookdata.text_content.length>800) {
            MessageSystem.message({
              message:'原文分享字数必须在50到800之间'
            })
            return false;
          }
        }
        return true;
    }else{
        MessageSystem.message({
            message:'请补全所有信息！'
        })
        return false;
    }
}
onInputBlur() {
    document.documentElement.scrollTop = 0;
    window.pageYOffset = 0;
    document.body.scrollTop = 0;
}
render() {
  return (
    <div className={style.ContentBox}>
        <div className={[style.Title,'childcenter childcontentstart'].join(' ')}>
            <img src={flowericon} className={style.TitleFlower} alt=""/>
            <div className={style.TitleValue}>选择书籍</div>
        </div>
        {this.state.bookdata?<div className={[style.BookBox,'childcenter'].join(' ')}>
            <div className={[style.BookCoverBox,'childcenter'].join(' ')}>
              <div className={style.CoverImage}>
                <img src={this.state.bookdata.bookimage} alt=""/>
              </div>
            </div>
            <div className={[style.BookName,'childcenter childcontentstart childalignstart'].join(' ')}>
              <span>{this.state.bookdata.bookname}</span> 
              <Link to='/newshare/select'><span className={style.ReChose}>重新选择</span></Link> 
            </div>
        </div>:''}
        <div className={style.InputBox}>
            <input type="text" value={this.state.bookdata.title} onChange={this.onInputChange.bind(this,'title')} onBlur={this.onInputBlur} placeholder='请输入读书笔记标题，不少于5个字噢'/>
        </div>
        <div className={style.PageNumer}>
            <span>页码:第</span><input value={this.state.bookdata.pageNum} placeholder='请输入' onBlur={this.onInputBlur} onChange={this.onInputChange.bind(this,'pageNum')} className={style.PageInput} type="tel" type='number'/><span>页</span>
        </div>
        <div className={[style.Title,'childcenter childcontentstart'].join(' ')}>
            <img src={flowericon} className={style.TitleFlower} alt=""/>
            <div className={style.TitleValue}>读书笔记，以下分享形式选择一种</div>
        </div>
        <div className={[style.ShareTypeNavBox,'childcenter'].join(' ')}>
            <div onClick={this.HandleShareType.bind(this,1)} className={[style.NavButton,this.state.shareType==1?style.ActButton:'','childcenter'].join(' ')}>原文分享</div>
            <div onClick={this.HandleShareType.bind(this,2)} className={[style.NavButton,this.state.shareType==2?style.ActButton:'','childcenter'].join(' ')}>图片分享</div>
        </div>
        <div className={style.ShareContent}>
            {(()=>{
                switch (this.state.shareType) {
                    default:
                    case 1:
                        return (
                        <div className={style.TextAreaBox}>
                            <textarea onBlur={this.onInputBlur} value={this.state.bookdata.text_content} placeholder='请在这里输入原文内容' onChange={this.onInputChange.bind(this,'text_content')}></textarea>
                        </div>
                        )
                    case 2:
                        return (
                            <div className={style.ImageBox}>
                                {this.state.bookdata.image_content?(
                                    <div className={style.ImageViewBox}>
                                        <img src={this.state.bookdata.image_content} alt=""/>
                                        <div className={style.ClickTips} onClick={LongImageView.bind(this,this.state.bookdata.image_content)}>点击查看原图</div>
                                        <div className={style.ReLoadButton} onClick={()=>{this.refs.imgfile.click()}}>重新上传</div>
                                    </div>
                                ):<div className={style.AddIcon} onClick={()=>{this.refs.imgfile.click()}}></div>}
                                <input type="file" ref={'imgfile'} onChange={this.onUploadImage} style={{display:'none'}}/>
                            </div>
                        )
                }
            })()}
        </div>
        <div className={[style.ButtonGroup,'childcenter'].join(' ')}>
            {this.props.index == 0?'':<div className={[style.NextButton,style.ForwardButton,'childcenter'].join(' ')} onClick={this.Beforestep}>上一步</div>}
            <div className={[style.NextButton,'childcenter'].join(' ')} onClick={this.Nextstep}>下一步</div>
        </div>
    </div>
   )
   }
}
export default FillShareInfo