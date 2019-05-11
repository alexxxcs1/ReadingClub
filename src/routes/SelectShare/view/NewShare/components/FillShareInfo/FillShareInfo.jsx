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
  this.onImageUpdata = this.onImageUpdata.bind(this);
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
onImageUpdata(array){
  this.state.bookdata.image_content = array;
  this.setState(this.state);
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
                            <ImageUploadBox imageArray={this.state.bookdata.image_content} onUpdate={this.onImageUpdata}/>
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

class ImageUploadBox extends Component{
  constructor(props){
    super(props);
    this.state={
      uploadProgress:0,
      imageArray:[],
    };
    this.HandleUploadImage = this.HandleUploadImage.bind(this);
    this.refreshProps = this.refreshProps.bind(this);
  }
  componentDidMount(){
    this.refreshProps(this.props)
  }
  componentWillReceiveProps(nextprops){
   this.refreshProps(nextprops) 
  }
  refreshProps(props){
    this.state.imageArray = this.state.imageArray.length == 0 && props.imageArray ? props.imageArray : this.state.imageArray;
    this.setState(this.state);
  }
  HandleUploadImage(e){
    let file = e.target.files[0];
    let formdata = new FormData();
    formdata.append('file',file);
    formdata.append('type','img');
    e.target.value = '';
    this.state.imageArray.push({
      url:null,
      uploadProgress:0,
    });
    let index = this.state.imageArray.length-1;
    this.setState(this.state);
    api.uploadFile(formdata,(progressEvent)=>{
      var complete = (progressEvent.loaded / progressEvent.total);
        this.state.imageArray[index].uploadProgress = Math.min(complete,0.9);
        this.setState(this.state);
    }).then(res=>{
      if (res.code == 200) {
        this.state.imageArray[index].url = res.data.url;
        this.state.imageArray[index].uploadProgress = 1;
        this.props.onUpdate(this.state.imageArray);
        this.setState({
          imageArray:this.state.imageArray,
        })
      }else{
        this.state.imageArray.splice(index,1);
        this.setState({
          imageArray:this.state.imageArray,
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
  HandleDelete(index){
    this.state.imageArray.splice(index,1);
    this.props.onUpdate(this.state.imageArray);
    this.setState(this.state);
  }
  ViewLongImage(url){
    LongImageView(url);
  }
  createImageBox(){
    let result = [];
    for (let z = 0; z < this.state.imageArray.length; z++) {
      const imageobj = this.state.imageArray[z];
      result.push(
        <div className={[style.ImageCover,'childcenter'].join(' ')}>
            <div className={style.DeleteButton} onClick={this.HandleDelete.bind(this,z)}></div>
            <div className={[style.CoverBox,'childcenter'].join(' ')} onClick={this.ViewLongImage.bind(this,imageobj.url)}>
              <img src={imageobj.url} className={style.Cover} alt=""/>
            </div>
            {imageobj.uploadProgress == 0||imageobj.uploadProgress == 1?'':<div className={[style.ProgressCircle,'childcenter'].join(' ')}>
              <svg width="120" height="120" className={style.ProgressSvg}>
                  <text  x="50%" y="50%" fill="rgba(100,181,175,1)" fontSize='12' textAnchor='middle' dominantBaseline='middle'>{Math.round(imageobj.uploadProgress*100)}%</text >
                  <circle cx="50%" cy="50%" r="20" stroke-width="3" stroke-linecap='round ' stroke="rgba(100,181,175,1)" fill="none" strokeDasharray={754*imageobj.uploadProgress +" 754"}></circle>
              </svg>
            </div>}
        </div>
      )
    }
    return result;
  }
  render(){
    return (
      <div className={[style.ImageBox,'childcenter childcontentstart'].join(' ')}>
        {this.createImageBox()}
        {this.state.imageArray.length<4?<div className={style.AddIcon} onClick={()=>{this.refs.uploadfile.click()}}></div>:''}
        <input type="file" ref='uploadfile' style={{display:'none'}} onChange={this.HandleUploadImage}/>
      </div>
    )
  }
}

export default FillShareInfo