import React, { Component } from 'react'
import style from './FillShareInfo.scss'
import flowericon from 'assets/flowericon.png'
import book from 'assets/book.jpg'
import {Link} from 'react-router-dom';
import MessageSystem from 'components/MessageSystem'
  
export class FillShareInfo extends Component {
constructor(props) {
  super(props);
  this.state = {
      shareType:1,
      bookdata:null,
  };
  this.refreshProps = this.refreshProps.bind(this);
  this.HandleShareType = this.HandleShareType.bind(this);
  this.HandleTextValue = this.HandleTextValue.bind(this);
  this.Nextstep = this.Nextstep.bind(this);
  this.Beforestep = this.Beforestep.bind(this);
  this.onInputChange = this.onInputChange.bind(this);
  this.Verify = this.Verify.bind(this);
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
    let json = JSON.parse(JSON.stringify(this.state.bookdata));
    json.type = this.state.shareType;
    if (this.Verify()) {
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
    this.setState({
        bookdata:this.state.bookdata,
    })
}
Verify(){
    if (this.state.bookdata.title&&this.state.bookdata.pageNum&&(this.state.bookdata.text_content||this.state.bookdata.image_content)) {
        return true;
    }else{
        MessageSystem.message({
            message:'请补全所有信息！'
        })
        return false;
    }
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
            <input type="text" onChange={this.onInputChange.bind(this,'title')} placeholder='请输入读书笔记标题，不少于5个字噢'/>
        </div>
        <div className={style.PageNumer}>
            <span>页码:第</span><input placeholder='请输入' onChange={this.onInputChange.bind(this,'pageNum')} className={style.PageInput} type="tel" type='number'/><span>页</span>
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
                            <textarea value={this.state.textValue} placeholder='请在这里输入原文内容' onChange={this.onInputChange.bind(this,'text_content')}></textarea>
                        </div>
                        )
                    case 2:
                        return (
                            <div className={style.ImageBox}>

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