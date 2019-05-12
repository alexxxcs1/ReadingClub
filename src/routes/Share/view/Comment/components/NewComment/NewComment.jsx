import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import style from './NewComment.scss'

import flowericon from 'assets/flowericon.png'
import mountainicon from 'assets/mountainicon.png'
import moreflowericon from 'assets/moreflowericon.png'
import MessageSystem from 'components/MessageSystem'
import LongImageView from 'components/LongImageView'
import ShareBox from 'components/ShareBox'
import {api} from 'common/app'
  
export class NewComment extends Component {
constructor(props) {
  super(props);
  this.state = {
      uploadProgress:0,
      data:{},
      content:null,
      imgurl:null,
  };
     this.refreshProps = this.refreshProps.bind(this);
     this.onUploadImage = this.onUploadImage.bind(this);
     this.HandleImageDelete = this.HandleImageDelete.bind(this);
     this.SubmitComment = this.SubmitComment.bind(this);
     this.onInputBlur = this.onInputBlur.bind(this);
     this.HandleTextAreae = this.HandleTextAreae.bind(this);
}
componentWillReceiveProps(nextprops) {
  this.refreshProps(nextprops);
}
componentDidMount() {
  this.refreshProps(this.props);
}
refreshProps(props) {
    console.log(props.data.data);
    
  this.setState({
      data:props.data.data,
  })
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
        this.state.imgurl = res.data.url;
        this.setState({
            uploadProgress:1,
            imgurl:this.state.imgurl
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
HandleImageDelete(){
    this.setState({
        imgurl:null,
    })
}
SubmitComment(){
    api.CommentToShare(this.state.data.nid,this.state.content,this.state.imgurl).then(res=>{
        if (res.code === 200) {
            this.props.onClose(res.data);
            ShareBox(window.location.href,{
                type:'newcomment',
                id:res.data.id
            })
        }else{
            MessageSystem.message({
                message:res.msg
            })
        }
        
    },err=>{
        console.log(err);
    })
}
HandleTextAreae(e){
    this.setState({
        content:e.target.value
    })
}
onInputBlur() {
    document.documentElement.scrollTop = 0;
    window.pageYOffset = 0;
    document.body.scrollTop = 0;
 }
render() {
  return (
    <div className={style.FixedBox}>
        <div className={style.ContentBox}>
            <div className={[style.TitleBox,'childcenter childcontentstart'].join(' ')}>
                <div className={[style.TitleValue,'childcenter'].join(' ')}>
                    <img src={flowericon} alt=""/>
                    <span>评论TA的读书笔记</span>
                </div>
                <div className={[style.CloseButton,'childcenter childcontentend'].join(' ')}>
                    <span onClick={()=>{this.props.onClose()}}>取消</span>
                </div>
            </div>
            <div className={[style.InfoBox,'childcenter'].join(' ')}>
                <div className={[style.HeadShotBox,'childcenter'].join(' ')}>
                    <img src={this.state.data.headimgurl} alt=""/>
                </div>
                <div className={[style.UserName,'childcenter childcontentstart'].join(' ')}>
                    {this.state.data.uname}{this.state.data.nickname?'('+this.state.data.nickname+')':''}
                </div>
            </div>
            <div className={style.Line}></div>
            <div className={style.MyComment}>
                <div className={style.TipsTitle}>我的评论</div>
                <div className={style.CommentBox}>
                    <textarea className={style.textaresbox} onBlur={this.onInputBlur} value={this.state.content} onChange={this.HandleTextAreae} rows="10" placeholder='请在此输入您的评论，字数50+才我们才为你发布噢'></textarea>
                    <div className={[style.ImageGroup,'childcenter childcontentstart'].join(' ')}>
                        <div className={[style.ImageBox,this.state.imgurl?style.able:style.unable,'childcenter'].join(' ')}>
                            {this.state.uploadProgress !=0&&this.state.uploadProgress!=1?<div className={[style.ProgressBox,'childcenter'].join(' ')}>
                                <div className={style.bar} style={{width:this.state.uploadProgress * 100 + '%'}}></div>
                            </div>:''}
                            
                            <div className={[style.box,'childcenter'].join(' ')} onClick={LongImageView.bind(this,this.state.imgurl)}>
                                <img src={this.state.imgurl} alt=""/>
                            </div>
                            <span className={style.DeleteButton} onClick={this.HandleImageDelete}></span>
                        </div>
                        <div className={style.NewImageButto} onClick={()=>{this.refs.file.click()}}>
                            <img src={mountainicon} alt=""/>
                            <span>插入图片</span>
                            <input type="file" ref='file' onChange={this.onUploadImage} style={{display:'none'}}/>
                        </div>
                    </div>
                </div>
            </div>
            <div className={style.ImageTips}>
                只可以插入一张图片噢，如果有多张图片建议先拼合图片再进行上传
            </div>
            <div className={style.Line}></div>
            <div className={style.SubmitButton}>
                <div className={[style.ButtonValue,'childcenter'].join(' ')} onClick={this.SubmitComment}>
                    发布
                </div>
                <img className={style.ButtonBackground} src={moreflowericon} alt=""/>
            </div>
        </div>
    </div>
   )
   }
}

function GetView(data,onClose){
    return <NewComment data={data} onClose={onClose}/>
}

const View = ({data,onClose})=>{
    return (
        ReactDOM.createPortal(GetView(data,onClose),document.querySelector('body'))
    )
}

const _ViewFunc = (userdata,onClose)=>{
    let div = document.createElement('div');
    const destroy = (reply) => {
        if (reply) {
            onClose?onClose(reply):'';
        }else{
            onClose(null)
        }
        const unmountResult = ReactDOM.unmountComponentAtNode(div);
        if (unmountResult && div.parentNode) {
            div.parentNode.removeChild(div); 
            
        }
    }
    const render = () => {
        ReactDOM.render(<View data={userdata} onClose={destroy}/>, div);
    }
    render();
    return {
        destroy: destroy,
    }
}

export default _ViewFunc