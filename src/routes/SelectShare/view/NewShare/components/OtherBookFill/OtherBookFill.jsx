import React, { Component } from 'react'
import style from './OtherBookFill.scss'
import flowericon from 'assets/flowericon.png'
import book from 'assets/book.jpg'
import MessageSystem from 'components/MessageSystem'
  
export class OtherBookFill extends Component {
constructor(props) {
  super(props);
  this.state = {
    bookdata:{},
  };
     this.refreshProps = this.refreshProps.bind(this);
     this.onStateValueChange = this.onStateValueChange.bind(this);
     this.Nextstep = this.Nextstep.bind(this);
     this.Verify = this.Verify.bind(this);
     this.onInputBlur = this.onInputBlur.bind(this);
}
componentWillReceiveProps(nextprops) {
  this.refreshProps(nextprops);
}
componentDidMount() {
  this.refreshProps(this.props);
}
refreshProps(props) {
  console.log(props.data);
  
  this.setState({
      bookdata: props.data?props.data:this.state.bookdata
  })
}
onStateValueChange(type,e){
    this.state.bookdata[type] = e.target.value;
    this.setState({
        bookdata:this.state.bookdata,
    })
}
Nextstep(){
    let json = JSON.parse(JSON.stringify(this.state.bookdata));
    json.type = this.state.shareType;
    if (this.Verify()) {
        this.props.onStepChange(1,json);
    }
    
}
Verify(){
    if (this.state.bookdata.bookname&&this.state.bookdata.bookauthor&&this.state.bookdata.bookcontent) {
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
            <div className={style.TitleValue}>请填写书籍基本信息</div>
        </div>
        <div className={style.InputBox}>
            <div className={style.Inputs}>
                <input onBlur={this.onInputBlur} type="text" value={this.state.bookdata.bookname} onChange={this.onStateValueChange.bind(this,'bookname')} placeholder='请输入书籍名称'/>
            </div>
        </div>
        <div className={style.InputBox}>
            <div className={style.Inputs}>
                <input onBlur={this.onInputBlur} type="text" value={this.state.bookdata.bookauthor} onChange={this.onStateValueChange.bind(this,'bookauthor')} placeholder='请输入作者姓名'/>
            </div>
        </div>
        <div className={style.TextAreadBox}>
            <div className={style.Textareas}>
                <textarea tonBlur={this.onInputBlur} ype="text" value={this.state.bookdata.bookcontent} onChange={this.onStateValueChange.bind(this,'bookcontent')} placeholder='内容简介，不超过300字'/>
            </div>
        </div>
        <div className={[style.ButtonGroup,'childcenter'].join(' ')}>
            <div className={[style.NextButton,'childcenter'].join(' ')} onClick={this.Nextstep}>下一步</div>
        </div>
    </div>
   )
   }
}
export default OtherBookFill